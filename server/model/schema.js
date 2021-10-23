const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    givenName:{
        type:String,
        required:true
    },
    familyName:{
        type:String,
        required:true
    }
});

const User = mongoose.model('USER',userSchema);

module.exports = User;