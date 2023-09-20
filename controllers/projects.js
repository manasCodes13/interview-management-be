const Projects = require("../models/Projects.modal");
const Users = require("../models/User.model")

const createProjects = async (req, res) => {
    const { body } = req.body;

    try {

        if (!body) {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Please send all the details"
            })
            return;
        }

        const checkForUniqueProject = await Projects.findOne({
            uniqueName: body?.uniqueName
        })

        if (checkForUniqueProject) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Project Unique Name is already available"
            })
            return;
        }

        const createNewProject = new Projects(body)
        await createNewProject.save();

        return res.status(200).json({
            status: 200,
            success: true,
            message: "Project Created Successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: err
        })
    }
}

const getAllProjects = async (req, res) => {
    const { organizationId } = req.params;
    const { role } = req.query;

    try {
        if (!organizationId) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Please send organization Id"
            })
            return;
        }

        const checkForProjects = await Projects.find({
            organizationId: organizationId
        })

        return res.status(200).json({
            message: "Projects Retrieved Successfully",
            data: checkForProjects,
            success: true,
            status: 200
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

module.exports = { createProjects, getAllProjects }