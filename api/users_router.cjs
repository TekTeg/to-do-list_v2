const {createUser, updateUserDetails, getUser, getUserByToken} = require ('../db/users.cjs')
const express = require('express')
const usersRouter = express.Router()
usersRouter.use(express.json())

usersRouter.get('/', async(req, res, next)=>{
  await res.send('I am user')
})
//Registration
usersRouter.post('/register', async(req, res, next)=>{
  try{
    console.log("req.body")
    console.log(req.body)
    const userData = req.body
    const user = await createUser(userData)
    res.status(201).json({
      success:true,
      data:user
    })
  }catch(err){
    console.log('Error creating user' + err)
  }
})

module.exports=
  usersRouter
