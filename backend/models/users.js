const mongoose = require('mongoose')
//schema design
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name is required'],
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'paswword is required'],
        
    }, 
},
{timestamps:true}
);

//export
const userModel = mongoose.model('users',userschema)
module.exports = userModel