const {
  createUser,
  updateUserDetails,
  getUser,
  getUserByToken
} = require('../db/users.cjs')
const express = require('express')
const usersRouter = express.Router()
usersRouter.use(express.json())

usersRouter.get('/', async (req, res, next) => {
  await res.send('I am user')
})
//Registration
usersRouter.post('/register', async (req, res, next) => {
  try {
    const userData = req.body
    const user = await createUser(userData)
    res.status(201).json({
      success: true,
      data: user
    })
  } catch (err) {
    if (err.message === 'User with this email already exists.') {
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
//Login
usersRouter.post('/login', async (req, res, next) => {
  console.log(req.body)
  // try {
  //   const {
  //     email,
  //     password
  //   } = req.body
  //   console.log(req.body)
  //   const {
  //     user,
  //     userToken
  //   } = await getUser(email, password)
  //   console.log('user created')
  //   console.log(userToken)
  //   res.json({
  //     success: true,
  //     user: user,
  //     token: userToken
  //   })
  // } catch (err) {
  //   if(err.message === 'Username and Password does not match!')
  //     {
  //       res.status(409).json({
  //           success: false,
  //           message: err.message
  //       });
  //   } else {
  //       res.status(500).json({
  //           success: false,
  //           message: 'Internal server error'
  //       });
  //   }
  // }
})

module.exports =
  usersRouter