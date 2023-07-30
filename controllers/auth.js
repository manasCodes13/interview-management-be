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
      createError(409, "User already exists, Please Login!");
      return;
    }

    // encrypt password
    const encryptPassword = bcrypt.hashSync(password, 10);

    const otp = generateOTp;
    emailSender(email, otp);

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
      message: "User Created Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const checkForUser = await User.findOne({
    email: email,
  });

  if (!checkForUser) {
    res.status(400).json({
      status: 400,
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
      message: "OTP Matched Successfully",
    });
  } else {
    res.status(400).json({
      message: "OTP didn't match",
    });
  }
};

const resendOtp = async (req, res) => {
  const { email } = req.body;

  // check for user
  const checkForUser = await User.findOne({
    email: email,
  });

  if (!checkForUser) {
    res.status(400).json({
      status: 400,
      message: "User not found",
    });
    return;
  }

  const otp = generateOTp;

  await OTP.findOneAndUpdate({ userId: checkForUser?._id }, { otp: otp });
  emailSender(email, otp);

  return res.status(200).json({
    status: 200,
    message: "OTP updated",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    res.status(400).json({
        status: 400,
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
      data: checkForUser,
      accessToken: token,
    });
  } else {
    return res.status(400).json({
      status: 400,
      message: "Password is wrong",
    });
  }
};

// TODO: have to do forget password after frontend

module.exports = { registerController, verifyOtp, resendOtp, login };
