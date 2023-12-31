//const { JsonWebTokenError } = require('jsonwebtoken');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: '3d' });
};

const loginUser = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.login({email, password});
        const token = createToken(user._id, user.role);
        const role=user.role;
        const name=user.name;
        res.status(200).json({ email, token,role,name});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const signupUser = async (req, res) => {
    const { email, password, name, role } = req.body;
    console.log("sign up controller")
    console.log({email, password, name, role})
    try {
        const user = await User.signup({email, password, name, role});
        const token = createToken(user._id, user.role);
        res.status(200).json({ email, token});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const changePassword = async (req, res) => {
    const { email, currentPassword, newPassword, confirmNewPassword } = req.body;
    try {
      const user = await User.changePassword({ email, currentPassword, newPassword, confirmNewPassword });
      const token = createToken(user._id, user.role);
      res.status(200).json({ email, token});
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  module.exports = { signupUser, loginUser, changePassword };