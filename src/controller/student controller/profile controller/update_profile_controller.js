// Student model
const student_model = require("../../../models/student models/student_model");
// Responses
const { responses } = require("../../../utils/constants/api_responses");

// Update Profile Data
exports.updateprofile = async(req, res) => {
    try {
        const { _id, fname, lname, dob, gender, profileurl } = req.body;

        const student = {
            fname,
            lname,
            dob,
            gender,
            profileurl,
        };

        student_model.findOneAndUpdate({
                _id
            }, {
                $set: student
            }, {
                new: true
            }

        ).exec(async(error, std) => {
            if (std) {
                return res.status(200).json({
                    data: std,
                    token: std["token"],

                })
            } else {
                return res.status(401).json({ message: responses.update_profile });

            }

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: responses.server_error });

    }
};