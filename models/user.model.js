const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    userName:String,
    email:String,
    quizzes: [
        { type: mongoose.Schema.Types.ObjectId, 
             ref: 'Quiz' 
            }],
})


const UserModel=mongoose.model("user",userSchema)

module.exports={UserModel}