const User = require("../models/User.model");
const Organization = require("../models/Orgnization.modal");


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
            success: true,
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
            success: false,
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
        success: true,
        data: getUserDetails?.[0]
    })



}

const getTeammates = async (req, res) => {
    const { orgId } = req.query;

    if (!orgId) {
        res.status(400).json({
            status: 400,
            success: false,
            message: "Please send us the organization Id"
        })
    }

    const checkForOrgId = await Organization.findOne({
        _id: orgId
    })

    if (!checkForOrgId) {
        res.status(400).json({
            status: 400,
            success: false,
            message: "Organization doesn't exist"
        })
        return;
    }

    // check for all users 
    const checkForAllUser = await User.find({
        orgId: orgId
    });

    return res.status(200).json({
        status: 200,
        success: true,
        message: "All Joined Users",
        data: checkForAllUser
    })


}


module.exports = { updateUserDetails, getUserDetails, getTeammates }