const {createTask, updateTaskDetails, getTask, getAllTasks, getTasksByCategory, getTasksByDate} = require ('../db/tasks.cjs')
const express = require('express')
const tasksRouter = express.Router()

tasksRouter.get('/', async(req, res, next)=>{
  await res.send('this is task')
})
tasksRouter.post('/log', async(req, res, next)=>{
 try{
  
  const taskData = await req.body
  const newTask = await createTask(taskData)
 }catch(err){
  console.log("Error reaching task creation. "+ err)
 }
})
module.exports=
  tasksRouter
