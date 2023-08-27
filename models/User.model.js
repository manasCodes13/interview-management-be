const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false, required: true },
    orgId: {type: Schema.Types.ObjectId, ref: 'Organization'},
    isDeleted: { type: Boolean, default: false, required: true },
    role: { type: String, required: true, default: "admin", role: ["admin", "user"] }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);


