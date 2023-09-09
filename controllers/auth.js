const bcrypt = require("bcrypt");
const createError = require("http-errors");
const User = require("../models/User.model");
const OTP = require("../models/OTP.model");
const emailSender = require("../helpers/emailSender");
const { createJsonWebToken } = require("../helpers/jsonwebtoken");

const generateOTp = Math.floor(1000 + Math.random() * 9000);

const registerController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      createError(400, "Email or Password is required");
      return;
    }

    // check for existing user
    const checkForUser = await User.findOne({
      email: email,
    });

    if (checkForUser) {
      res.status(400).json({
        status: 400,
        sucess: true,
        message: "User already exists",
      });
      return;
    }

    // encrypt password
    const encryptPassword = bcrypt.hashSync(password, 10);

    const otp = generateOTp;

    const html = `<h1>OTP: ${otp}</h1>`
    const subject = "OTP"

    emailSender(email, html, subject);

    const addUser = new User({
      email: email,
      password: encryptPassword,
    });
    addUser.save();

    const addOTP = new OTP({
      userId: addUser?._id,
      otp: otp,
    });

    addOTP.save();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User Created Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {

    const checkForUser = await User.findOne({
      email: email,
    });

    if (!checkForUser) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "User not found",
      });
      return;
    }

    const checkForOtp = await OTP.findOne({
      userId: checkForUser?._id,
      otp: otp,
    });

    if (checkForOtp) {
      await User.findOneAndUpdate(
        { _id: checkForUser?.id },
        { isEmailVerified: true }
      );

      res.status(200).json({
        success: true,
        status: 200,
        message: "OTP Matched Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        status: 400,
        message: "OTP didn't match",
      });
    }
  }
  catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {

    // check for user
    const checkForUser = await User.findOne({
      email: email,
    });

    if (!checkForUser) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "User not found",
      });
      return;
    }

    const otp = generateOTp;

    await OTP.findOneAndUpdate({ userId: checkForUser?._id }, { otp: otp });

    const html = `<h1>OTP: ${otp}</h1>`
    const subject = "OTP"

    emailSender(email, html, subject);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "OTP Resend Successfully",
    });
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "Email and Password is needed"
      })
      return;
    }

    // check For User
    const checkForUser = await User.findOne({
      email: email,
    })

    if (!checkForUser) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "User doesn't exist",
      });
      return;
    }

    // create jsonwebtoken
    const token = await createJsonWebToken(checkForUser);
    const checkForPassword = bcrypt.compareSync(password, checkForUser?.password);

    if (checkForPassword) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Logged in successfully",
        data: checkForUser,
        accessToken: token,
      });
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password is wrong",
      });
    }
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

// TODO: have to do forget password after frontend

module.exports = { registerController, verifyOtp, resendOtp, login };
