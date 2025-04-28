const {createTask, updateTaskDetails, getTask, getAllTasks, getTasksByCategory, getTasksByDate} = require ('../db/tasks.cjs')
const express = require('express')
const tasksRouter = express.Router()

tasksRouter.get('/', async(req, res, next)=>{
  await res.send('this is task')
})
tasksRouter.post('/add', async(req, res, next)=>{
 try{
  console.log(req.body)
  const taskData = await req.body
  const newTask = await createTask(taskData)
  res.json({
    success: true,
    data: newTask

 })
 }catch(err){
  console.log("Error reaching task creation. "+ err)
 }
})
module.exports=
  tasksRouter
