const Organization = require("../models/Orgnization.modal")
const User = require("../models/User.model");
const mongoose = require("mongoose")

const createOrgaization = async (req, res) => {
    const { orgName, orgUsername, email } = req.body;

    try {
        if (!orgName || !orgUsername || !email) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Please fill all the required fields"
            })
            return;
        }

        const checkForUser = await User.findOne({
            email: email
        });

        const checkForOrganization = await Organization.findOne({
            orgUserName: orgUsername
        })

        if (!checkForUser) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "User doesn't exist"
            })
            return;
        }

        if (checkForOrganization) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Organization already exists"
            })
            return;
        }

        // create organization
        const createOrganization = new Organization({
            orgName: orgName,
            orgUserName: orgUsername
        })

        await createOrganization.save()

        const organizationObjectId = createOrganization._id;

        console.log('organizationObjectId', organizationObjectId)

        // add organization id to the user
        await User.findOneAndUpdate({
            email: email
        }, { orgId: organizationObjectId }, { new: true })


        return res.status(200).json({
            status: 200,
            success: true,
            message: "Organization created successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error"
        })
    }

}

// const JoinOrganization = async 

module.exports = { createOrgaization }