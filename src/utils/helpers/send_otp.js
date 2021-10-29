const nodemailer = require("nodemailer");

exports.send_otp = async(email, otpcode) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVICE,
            port: process.env.EMAIL_PORT,
            secure: false,
            requireTLS: true,

            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS,
            },
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"EDUANCE" ${process.env.EMAIL_ID}`, // sender address
            to: `${email}`, // list of receivers
            subject: "Email Verification Eduance ✔", // Subject line
            text: "Dear User", // plain text body
            html: `<h2>WELCOME TO EDUANCE 😊</h2><h4>Your Eduance Verification Code is</h4><p>${otpcode}</p><p>This code is valid for 3 minutues and usable only once</p>`, // html body
        });
        transporter.verify(function(error, success) {
            if (error) {
                console.log(error);
                return false;
            } else {
                return success;
            }
        });
    } catch (error) {
        console.log(error);
        return false;
    }
};