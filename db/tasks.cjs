const client = require('./client.cjs')

const createTask = async(taskData)=>{
try{
  const {rows: newTask} = await client.query(`
    INSERT INTO tasks (category, task, due_date, task_place_distance, tast_estimated_duration, solo_or_group)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `, [taskData.category, taskData.task, taskData.dueDate, taskData.taskPlaceDistance, taskData.estimatedDuration, taskData.soloOrGroup]
  );
  return newTask
}catch(err){
  console.log("Error creating task" + err)
}
}
const updateTaskDetails = async()=>{
  console.log( 'updating Task')
}
const getTask = async()=>{
  console.log( 'getting Task')
}
const getAllTasks = async()=>{
  console.log( 'getting ALl Tasks')
}
const getTasksByCategory = async()=>{
  console.log( 'getting ALl Tasks by Category')
}
const getTasksByDate = async()=>{
  console.log( 'getting ALl Tasks by Category')
}

module.exports = {
createTask, 
updateTaskDetails,
getTask,
getAllTasks,
getTasksByCategory,
getTasksByDate
}