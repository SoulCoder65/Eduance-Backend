// Student model
const student_model = require("../../../models/student models/student_model");
// Responses
const { responses } = require("../../../utils/constants/api_responses");

// Fetch Profile Data
exports.fetchprofiledata = async(req, res) => {

    try {
        const { _id } = req.body;
        student_model.findOne({ _id }).exec(async(error, std) => {
            if (std) {
                return res.status(200).json({
                    data: std,
                    token: std["token"],
                });
            } else {
                return res.status(401).json({ message: responses.profile_data });

            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: responses.server_error });
    }

}