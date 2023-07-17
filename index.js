const express=require("express")
const { connection } = require("./configs/db")
const cors=require("cors")
const { userRoute } = require("./Routes/user.route")
const { quizRoute } = require("./Routes/quiz.route")
const app=express()

app.use(express.json())
app.use(cors())

app.use('/',userRoute)
app.use('/',quizRoute)

const port=process.env.PORT || 3001

app.listen(port,async()=>{
    try {
        await connection
        console.log(`conncted to port ${port}`)
        console.log(`conncted to DB`)
    } catch (error) {
        console.log(error.message)
    }
})