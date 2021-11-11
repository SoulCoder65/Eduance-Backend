// Student model
const student_model = require("../../../models/student models/student_model");
// Responses
const { responses } = require("../../../utils/constants/api_responses");
// for password hashing
const bcrypt = require("bcrypt");

// Update Profile Password

exports.updatepassword = async(req, res) => {
    try {
        const { _id, password, newpassword } = req.body;
        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashed_pass = await bcrypt.hash(newpassword, salt);
        student_model.findOne({ _id }).exec(async(error, std) => {
            if (std && (await bcrypt.compare(password, std.password))) {

                std.password = hashed_pass;
                std.save(function(err, pass) {
                    if (pass) {
                        return res.status(200).json("Success");
                    } else {
                        return res.status(401).json({ message: responses.update_password });

                    }
                });

            } else {
                return res.status(401).json({ message: responses.update_password_wrong });

            }
        })


    } catch (e) {
        console.log(error);
        return res.status(500).json({ message: responses.server_error });


    }
}