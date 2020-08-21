const User = require('../models/users');

exports.userGet = async (req,res,next) =>{
    const username = req.body.username;

    const user = await User.findByName(username);

    if(!user){
        return res.json({message:"no user with this username"});
    }
    return res.json({user: user});
};

exports.signup = (req,res,next) =>{

};