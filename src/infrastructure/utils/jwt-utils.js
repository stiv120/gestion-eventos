const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const jwtUtils = {
    generateToken() {
        const payload = {
            id: uuidv4()
        };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' });
    },
    verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
};
module.exports = jwtUtils;