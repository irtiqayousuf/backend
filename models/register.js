var mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    username: {
        type : String,
        required : true
    },
    lname: {
        type : String,
        required : true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    contact:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    conpassword:{
        type: String,
        required:true
    }

    

},{collection:"registered"});
module.exports = mongoose.model("User",UserSchema);