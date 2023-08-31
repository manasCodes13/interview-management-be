const User = require("../models/User.model");
const emailSender = require("../helpers/emailSender");


const updateUserDetails = async (req, res) => {
    const { email, data } = req.body;

    try {
        if (!email) {
            res.status(400).json({
                status: 400,
                message: "Email is needed"
            })
            return;
        }

        const checkUser = await User.findOne({
            email: email
        })

        if (!checkUser) {
            res.status(400).json({
                status: 400,
                message: "User doesn't exists"
            })
            return;
        }

        // udpate user
        await User.findOneAndUpdate({ email: email }, data, {
            new: true
        })

        return res.status(200).json({
            message: "User updated successfully",
            status: 200
        })

    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

const getUserDetails = async (req, res) => {
    const { email } = req.query;

    // get user details 
    const checkForuser = await User.findOne({
        email: email
    })

    if (!checkForuser) {
        res.status(400).json({
            status: 400,
            message: "User doesn't exist"
        })
        return;
    }

    const getUserDetails = await User.aggregate([
        { $match: { email: email } },
        {
            $lookup: {
                from: 'organizations',
                localField: 'orgId',
                foreignField: '_id',
                as: 'organization'
            }
        },
        {
            $unwind: {
                path: "$organization"
            }
        }
    ])

    res.status(200).json({
        status: 200,
        data: getUserDetails
    })



}

const inviteUser = async (req, res) => {
    const { email, role, orgId } = req.body;

    // check for user 
    const checkForUser = await User.findOne({
        email: email
    })

    if (checkForUser && checkForUser?.orgId) {
        res.status(400).json({
            status: 400,
            message: "User is already associated with an organization"
        })
        return;
    }
    else if (checkForUser && !checkForUser?.orgId) {
        const html = `<h1>Thanks For Choosing us</h1>
        <p>Click on the below button to accept the invite</p>
        <a href="http://localhost:3000/invite-user?email="${email}&org="${orgId}"><button>Click Here</button></a>`
        const subject = "Invite to yuva-projects"
        emailSender(email, html, subject)
    }


}

module.exports = { updateUserDetails, getUserDetails }