const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asynchandler = require('express-async-handler');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const User = require('../models/User.model');

const router = express.Router();
module.exports = router;

const register = async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res
            .status(400)
            .json({ email: 'User with email already exists' });
    } else {
        let salt = 0;
        let password = '';
        try {
            salt = await bcrypt.genSalt();
            password = await bcrypt.hash(req.body.password, salt);
        } catch (error) {
            console.log(error);
        }

        const userInfo = {
            name: req.body.name,
            email: req.body.email,
            password,
        };

        try {
            const newUser = await new User(userInfo).save();
            return res.json(newUser);
        } catch (error) {
            console.log(error);
        }
    }
};

const login = async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    const { email, password } = req.body;

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        return res
            .status(400)
            .json({ emailnotfound: 'User with email does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        const payload = { id: user._id, name: user.name };

        // Sign token
        jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: 31556926 },
            (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                });
            }
        );
    } else {
        return res
            .status(400)
            .json({ passwordincorrect: 'Password is incorrect' });
    }
};

router.route('/register').post(asynchandler(register));
router.route('/login').post(asynchandler(login));
