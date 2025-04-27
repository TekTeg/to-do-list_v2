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
    const userData = req.body
    const user = await createUser(userData)
    res.status(201).json({
      success:true,
      data:user
    })
  }catch(err){
    if(err.message === 'User with this email already exists.')
      {
        res.status(409).json({
            success: false,
            message: err.message
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
  }
})

module.exports=
  usersRouter
