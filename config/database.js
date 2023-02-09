const mongoose = require('mongoose');
const MONGO_URI ='mongodb+srv://irtiqa:irtiqa123@cluster0.blvqini.mongodb.net/project';
exports.connect =() =>{

    mongoose.connect(MONGO_URI,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(() => {
        console.log("DB connected successfully");
    }).catch((error)=>{
        console.log("Something went wrong while conecting to DB");
    })
}