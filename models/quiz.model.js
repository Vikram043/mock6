const mongoose=require("mongoose")


const questionSchema=mongoose.Schema({
  title: { type: String,
       },
answerOptions: [
  { type: String,
  required: true 
  }],
  
correctOptions: [
  { type: Number, 
  required: true
   }],
})


const quizSchema=mongoose.Schema({
  creator: {  type: String,
              ref: 'user',
              required: true,
            },
  title: { type: String, 
            required: true
         },
  description: { type: String,
                 required: true 
                },
  questions: [
            { type: questionSchema,
              required: true
             }
            ]
})


const QuizModel=mongoose.model("quiz",quizSchema)

module.exports={QuizModel}