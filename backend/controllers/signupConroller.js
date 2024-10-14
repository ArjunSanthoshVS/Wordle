require('dotenv').config()
const bcrypt = require('bcrypt')
const User = require("../models/user");
const { signupSchema } = require("../validation/signupValidation");

const signup = async (req, res) => {
    try {
        const { error, value } = signupSchema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const isExisting = await User.findOne({ email: value.email })

        if (isExisting) {
            return res.status(409).json({ success: false, message: "User with given email already Exist!" });
        }

        const hashedPassword = await bcrypt.hash(value.password, 10)

        await User.create({ ...value, password: hashedPassword })

        return res.status(201).json({ success: true, message: "Signup successful!" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = { signup };
