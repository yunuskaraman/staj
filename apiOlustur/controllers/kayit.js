const user = require("../models/user");
const bcrypt = require('bcrypt');


exports.postUserAdd = async (req,res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new user({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword,
        });

        const savedUser = newUser.save();
        res.status(200).json(newUser);
    }catch(err){
        res.status(500).json(err);
    }

}

exports.getUserListele = async (req,res) => {
    console.log(req.user);
    try{
        const pins = await user.find();
        const sonuc = {
            status:200,
            error:null,
            data:pins
        }
        res.status(200).json(sonuc);   
    }catch(err){
        res.status(500).json(err);
    }
}
