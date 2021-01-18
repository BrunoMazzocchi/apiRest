const User = require('../models/user');
const bcrypt = require('bcrypt')
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const schema = Joi.object({
    username:Joi.string().min(3).required(),
    email:Joi.string().min(4).required().email(),
    password:Joi.string().min(6).required()
});

const newUser = async (req, res) => {

    const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exists!');
    } else {
        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
        res.header('auth-token', token).send(token)
        
 }  
}

module.exports = {
    newUser
}