const jwt = require('jsonwebtoken')

const client = require('./client.cjs')

const createTask = async (taskData) => {
  try {
    const {
      rows: newTask
    } = await client.query(`
    INSERT INTO tasks (user_id, category, task, due_date, task_place_distance, task_estimated_duration, solo_or_group)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `, [taskData.userId, taskData.category, taskData.task,
      taskData.dueDate, taskData.taskPlaceDistance, taskData.estimatedDuration, taskData.soloOrGroup
    ]);
    return newTask
  } catch (err) {
    console.log("Error creating task" + err)
  }
}
const updateTaskDetails = async () => {
  console.log('updating Task')
}
const getTask = async () => {
  console.log('getting Task')
}
const getAllTasks = async (verification) => {
  try{
    const{userId} = await jwt.verify(verification, process.env.JWT_SECRET)
    console.log(userId)
    const {rows} = await client.query(`
      SELECT * FROM tasks WHERE user_id = ${userId};
      `)
    return rows
  }catch(err){
    console.log('Error getting task. ' + err)
  }

}
const getTasksByCategory = async () => {
  console.log('getting ALl Tasks by Category')
}
const getTasksByDate = async () => {
  console.log('getting ALl Tasks by Category')
}

module.exports = {
  createTask,
  updateTaskDetails,
  getTask,
  getAllTasks,
  getTasksByCategory,
  getTasksByDate
}