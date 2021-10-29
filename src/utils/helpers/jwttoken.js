var jwt = require('jsonwebtoken');

exports.createJWT = (user) => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d'
    });
    return token;

}