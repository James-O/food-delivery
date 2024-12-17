const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

const registerController = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        
        if (existingUser) {
            return res.status(200).send({
                message: "User with this email already exists",
                success: false,
            });
        }
        //user not found
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);//cost factor
        const hashPassword = await bcrypt.hash(password, salt);
        req.body.password = hashPassword;

        // Hash the confirmation password separately
        const hashPasswordConfirm = await bcrypt.hash(req.body.passwordConfirm, salt);

        // Generate OTP
        const otp = otpGenerator.generate(6, {
            digits: true,
            upperCase: false,
            specialChars: false,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            // alphabets: false,
            // specialChars: false,
        });
        req.body.passwordConfirm = hashPasswordConfirm;
        if (req.body.password === req.body.passwordConfirm) {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                profileImage: req.body.profileImage,
                password: req.body.password,
                passwordConfirm: req.body.passwordConfirm,
                otp: otp,
            });
            await newUser.save();

            const token = jwt.sign({
                id: newUser._id
            }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });

            // Setup nodemailer transporter
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: 'Food delivery shop',
                to: req.body.email,
                subject: 'Sending OTP for Email verification',
                text: `Your verification OTP is ${otp}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send("Failed to send email");
                } else {
                    res.send({ message: "OTP sent to email" });
                }
            });
            return res.status(201).send({
                message: "User registered successfully",
                data: {
                    user: newUser,
                    token,
                },
                success: true,
            });
        } else {
            return res.status(400).send({
                message: "Passwords do not match",
                success: false,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Registration error",
            success: false,
        });
    }
};

const authController = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                success: false,
            });
        } else {
            console.log(user);
            return res.status(200).send({
                message: "Register successful",
                data: { user },
                success: true
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Auth error",
            success: false
        });
    }
};

const loginController = async (req, res) => {
    try {
        //console.log(req.body);
        const user = await User.findOne({ email: req.body.email }).select("+password")
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                success: false,
            });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        const signuser = await User.findOne({ email: req.body.email });
        if (!isMatch) {
            return res.status(404).send({
                message: "Incorrect password and email",
                success: false,
            });
        }
        const token = jwt.sign({id: signuser._id}, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        return res.status(200).send({
            message: "Login successful",
            data: { user: signuser, token },
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "login error",
            success: false,
        });
    }
};

const verifyotpController = async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (user.otp === req.body.combineOtp) {
            user.isVerified = true;
            await user.save();
            return res.status(200).send({
                message: "Otp verified successfully",
                success: true,
            });
        }else{
            return res.status(400).send({
                message: "Otp not verified",
                success: false,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "login error",
            success: false,
        });
    }
}
module.exports = { registerController, authController, loginController, verifyotpController};