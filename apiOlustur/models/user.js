const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min:5,
        max:20,
        enique:true

    },
    email: {
        type: String,
        require: true,  
        max:50,
        enique:true

    },
    password: {
        type: String,
        require: true,
        min:6,
        enique:true

    },
    
}, {timestamps:true});

module.exports = mongoose.model("User",UserSchema);