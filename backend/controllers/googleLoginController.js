require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require('jsonwebtoken');

const googleLogin = async (req, res) => {
    console.log('google login');
    
    try {
        const { userName, email, image } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                userName,
                email,
                image,
            });

            await user.save();
            console.log("New user created:", user);
        } else {
            console.log("User exists, logging in:", user);
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, userName: user.userName },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } 
        );

        return res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
        });
    } catch (error) {
        console.error("Error during Google login:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { googleLogin };
