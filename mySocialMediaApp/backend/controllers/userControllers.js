const User = require('../models/userModel');

exports.allUser = (req, res) => {
    User.find({}).select('-password')
    .then(users => {
        return res.json({success: true, data: users, msg: 'Users getting successfully !!'})
    })
    .catch(console.log);
};