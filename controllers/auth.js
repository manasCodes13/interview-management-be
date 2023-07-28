const bcrypt = require("bcrypt");
const createError = require('http-errors')
const User = require("../models/User.model")

const registerController = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            createError(400, 'Email or Password is required')
            return;
        }

        // check for existing user
        const checkForUser = await User.findOne({
            email: email
        })

        if (checkForUser) {
            createError(409, 'User already exists, Please Login!')
            return;
        }

        // encrypt password
        const encryptPassword = bcrypt.hashSync(password, 10);

        const addUser = new User({
            email: email,
            password: encryptPassword
        })
        addUser.save()

        return res.status(200).json({
            status: 200,
            message: "User Created Successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }


}

module.exports = { registerController }