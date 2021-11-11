// Student model
const student_model = require("../../../models/student models/student_model");
// for password hashing
const bcrypt = require("bcrypt");
// JWT token
const { createJWT } = require("../../../utils/helpers/jwttoken");

// Responses
const { responses } = require("../../../utils/constants/api_responses");

// Signin
exports.signin = async(req, res) => {
    try {
        const { email, password } = req.body;
        const student = await student_model.findOne({ email });
        if (student && (await bcrypt.compare(password, student.password))) {
            const token = createJWT({ student_id: student._id, email });
            student.token = token;
            return res.status(202).json({
                data: student,
                token: token,
            });
        }
        // console.log(student)
        return res.status(401).json({ message: responses.invalid_c });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: responses.server_error });
    }
};