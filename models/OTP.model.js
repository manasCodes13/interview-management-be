const mongoose = require("mongoose");
const { Schema } = mongoose;

const otpSchema = new Schema({
   userId: { type: Schema.Types.ObjectId, ref: 'User' },
   otp: { type: Number, required: true }
}, { timestamps: true })

module.exports = mongoose.model('OTP', otpSchema);