const express=require("express")
const { QuizModel } = require("../models/quiz.model")

const quizRoute=express.Router()

quizRoute.get("/quizz",async(req,res)=>{
    try {    
    const quizzes=await QuizModel.find()
    res.status(200).send(quizzes)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})


quizRoute.post("/quizz",async(req,res)=>{
    const {creator,title,description,questions}=req.body
    try {
        const quiz = new QuizModel({ creator, title, description, questions });
        await quiz.save();
        res.status(200).send(quiz)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

quizRoute.get("/quizz/:id", async (req, res) => {
    try {
      const quizId = req.params.id;
      const quiz = await QuizModel.findById(quizId);
      
      if (!quiz) {
        return res.status(400).send({ message: "Quiz not found" });
      }
  
      res.status(200).send(quiz);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  quizRoute.patch('/quizzes/:id', async (req, res) => {
    const quizId = req.params.id;
    const { title, description } = req.body;
  
    try {
      const quiz = await QuizModel.findByIdAndUpdate(quizId, { title, description });
  
      if (!quiz) {
        return res.status(400).send({ message: 'Quiz not found' });
      }
  
      res.status(200).send({message:"Quizz Updated"});
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
  
  // Delete a quiz
  quizRoute.delete('/quizzes/:id', async (req, res) => {
    const quizId = req.params.id;
    try {
      const quiz = await QuizModel.findByIdAndDelete(quizId);
      res.status(200).send({ message: 'Quiz deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  quizRoute.get('/quizz/:id/questions', async (req, res) => {
    const quizId = req.params.id;
  
    try {
      const quiz = await QuizModel.findById(quizId);
  
      if (!quiz) {
        return res.status(200).send({ message: 'Quiz not found' });
      }

      const questions = quiz.questions;
      res.status(200).send(questions);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

module.exports={quizRoute}