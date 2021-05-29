const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// MODELS
const User = require('../models/userModel');

const singToken = id => {
    return jwt.sign({id}, 'mySecret', {expiresIn: '6h'});
};

exports.signup = async (req, res, next) => {
    const {name, email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            return res.json({success: false, message: 'Email all ready exist !!!'});
        }
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hashPassword) => {
                if(err) {
                    console.log(err);
                    return;
                }
                const newUser = new User({
                    name: name,
                    email: email,
                    password: hashPassword
                });
                try{
                    const user = await newUser.save();
                    res.status(201).json({success: true, message: 'User registration successfully'})
                 }
                 catch(err){
                    res.json({success: false, message: 'Unknwon Error Occur!!'});
                    console.log(err);
                 }
            });
        });
    }
    catch(err){
      console.log(err);
    }

};

exports.signIn = async (req, res, next) => {
    const {email, password} = req.body;
    try{
       const user = await User.findOne({email});
       if(!user){
        return  res.json({success: false, message: 'Invalid Crediantial'});
       };

       bcrypt.compare(password, user.password, (err, isCorect) => {
        if(!isCorect){
            return  res.json({success: false, message: 'Incorrect password'});
        }

        // Create user token
        let Token = singToken(user._id);
        delete user.password;
        delete user.email;
        const newUser = {
            _id: user._id,
            name: user.name,
            profilePic: user.profilePic
        };
        return  res.json({success: true, token: Token, user: newUser, message: 'Login Sucessfully'});
    });
    }catch(err){
        console.log(err)
    }
};


    
