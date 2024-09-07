// Imports
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { SALT_ROUNDS, EMAIL_ID, FRONTEND_URL } = require('../utils/config');
const transporter = require('../utils/emailSender');
const randomstring = require('randomstring');

const userController = {
    registerUser: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;

            // Check if user exists
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            // Save user to db
            const newUser = new User({ firstName, lastName, email, password: hashedPassword });
            await newUser.save();
            
            return res.status(201).json({ message: 'User created' });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Compare password
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ message: 'Incorrect password' });
            }

            return res.json({ message: 'User login successful' });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;

            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Generate random string
            const randomString = randomstring.generate({
                length: 12,
                charset: 'alphabetic'
            });

            // Ensure reset link is valid for only 1 hour
            const expiryTimeStamp = Date.now() + 60 * 60 * 1000;
            
            // Store random string and expiry timestamp in the db
            const updateResult = await User.updateOne(
                { email },
                { $set: { resetToken: randomString, resetTokenExpiry: expiryTimeStamp } }
            );

            // Reset link
            const resetLink = `${FRONTEND_URL}/resetPassword/?token=${randomString}&expires=${expiryTimeStamp}`;

            // Mail options
            const mailOptions = {
                from: EMAIL_ID,
                to: user.email,
                subject: 'Reset Password',
                text: `Please use the following link to reset your password: ${resetLink}`
            };

            // Send email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ message: 'Error sending email' });
                }

                return res.json('Reset link sent');
            });

        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    resetPassword: async (req, res) => {
        try {
            // Extract token and newPassword from request
            const { token } = req.params;
            const { newPassword } = req.body;

            // Verify token and expiry
            const user = await User.findOne({ 
                resetToken: token, 
                resetTokenExpiry: { $gt: Date.now() } 
            });

            if (!user) {
                return res.status(400).json({ message: 'Reset link has expired or is invalid' });
            }
    
            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

            // Update the user password in the database
            const updateResult = await User.updateOne(
                { resetToken: token },
                { $set: { password: hashedPassword, resetToken: null, resetTokenExpiry: null } }
            );

            return res.json({ message: 'Password reset successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Password reset failed' });
        }
    }
    

};

module.exports = userController;