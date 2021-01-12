const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');
const _= require('lodash');

const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
});

const auth = async (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password');
    } 
    const validPassword =  await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }

    //JWT TOKEN
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
};




module.exports = {auth}
