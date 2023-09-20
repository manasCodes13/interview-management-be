const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: { type: String, required: true },
    uniqueName: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
    color: { type: String, required: true },
    private: { type: Boolean, default: false, required: true },
    startDate: { type: String, required: true },
    ongoing: { type: Boolean, required: true, default: true },
    endDate: { type: String },
    priority: { type: String, enum: ["Low", "High", "Medium"] },
}, { timestamps: true })

module.exports = mongoose.model('Project', projectSchema);


