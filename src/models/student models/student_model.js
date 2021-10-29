const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
    },
    phone: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
    },
    gender: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    profileurl: {
        type: String,
    },

    token: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model("student", StudentSchema);