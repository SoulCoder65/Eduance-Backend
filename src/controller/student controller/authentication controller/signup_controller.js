// Student model
const student_model = require("../../../models/student models/student_model");
// for password hashing
const bcrypt = require("bcrypt");
// JWT token
const { createJWT } = require("../../../utils/helpers/jwttoken");
// Get Random String
const { random } = require("../../../utils/helpers/random_string");

// Responses
const { responses } = require("../../../utils/constants/api_responses");

// Email Service
const { send_otp } = require("../../../utils/helpers/send_otp")

// Signup
exports.signup = async(req, res) => {
    try {
        const { email, fname, lname, password, dob, gender, phone } = req.body;

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashed_pass = await bcrypt.hash(password, salt);

        // Create New Student
        const student = new student_model({
            email,
            fname,
            lname,
            dob,
            gender,
            phone,
            username: `${fname.toLowerCase()}${random(5)}`,
            password: hashed_pass,
        });

        const token = createJWT({ student_id: student._id, email });

        student.token = token;
        student.save((er, std) => {
            if (er) {
                return res.status(401).json({ message: responses.signup_un });
            } else {
                return res.status(201).json({
                    data: student,
                    token: token,
                });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: responses.server_error });
    }
};

// -------Check Duplicate Email---------
exports.check_duplicate_email = async(req, res) => {
    try {
        const { email } = req.body;
        student_model.findOne({ email }).exec(async(er, std) => {
            if (std) {
                return res.status(409).json({ message: responses.email_already });
            } else {
                let otpcode = Math.floor(100000 + Math.random() * 900000)
                console.log(otpcode);
                const otp_res = await send_otp(email, otpcode)
                if (otp_res) {
                    return res.status(200).json({ message: responses.email_valid });

                } else {
                    return res.status(202).json({ message: responses.email_valid, otpcode: otpcode });

                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: responses.server_error });
    }





};