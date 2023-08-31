const mongoose = require("mongoose");
const { Schema } = mongoose;

const organizationSchema = new Schema({
    orgName: {type: String, required: true},
    orgUserName: {type: String, required: true},
    members: {type: Number, default: 0, required: true}
}, { timestamps: true })

module.exports = mongoose.model('Organization', organizationSchema);