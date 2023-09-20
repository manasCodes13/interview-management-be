const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String },
    displayName: { type: String },
    dob: { type: String },
    jobTitle: { type: String },
    address: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false, required: true },
    orgId: { type: Schema.Types.ObjectId, ref: 'Organization' },
    isDeleted: { type: Boolean, default: false, required: true },
    public: [{ type: String }],
    role: { type: String, required: true, default: "admin", role: ["admin", "member"] }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);


