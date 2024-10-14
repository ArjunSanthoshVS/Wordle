require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require("../models/user");
const { loginSchema } = require('../validation/loginValidation');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const isExisting = await User.findOne({ email: value.email });

        if (!isExisting) {
            return res.status(409).json({ success: false, message: "User with given email does not exist!" });
        }

        const isPasswordValid = bcrypt.compare(value.password, isExisting.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password!" });
        }

        const token = jwt.sign(
            { userId: isExisting._id, email: isExisting.email, userName: isExisting.userName },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            user: {
                id: isExisting._id,
                email: isExisting.email,
                userName: isExisting.userName
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { login };
