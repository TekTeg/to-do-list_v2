const client = require('./client.cjs')
require("dotenv").config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createUser = async(userData)=>{
  console.log( userData )
  try{
    const {rows:userExits} = await client.query (`
      SELECT * FROM users WHERE email = '${userData.email}';
      `)
    console.log(userExits)
    if(userExits[0]) {
      throw new Error('User with this email already exists.');
    }
    else{
    
      const encryptedPassword = await bcrypt.hash(userData.password, 10)
      const {rows} = await client.query (`
        INSERT INTO users ( email, password, gender, age, sleep_pattern, wakeup_pattern)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `, [userData.email, encryptedPassword, userData.gender, userData.age, userData.sleepPattern, userData.wakeUpPattern]);
      const user = rows[0]
      return user
    }
            
  }catch(err){
    console.log('Error creating user.')
    throw err
  }
}

const getUser = async(email, password)=>{
  try{
    const {rows} = await client.query (`
      SELECT * FROM users WHERE email = '${email}';
      `)
    const userExits = rows[0];
    if (!userExits) {
      throw new Error('Username and Password does not match!')
    }else{
      const hashedPassword = userExits.password;
      const isPasswordCorrect =  await bcrypt.compare(password, hashedPassword)
      if(isPasswordCorrect)
      {
        const token = await jwt.sign ({userId:userExits.id}, process.env.JWT_SECRET);
        return {
          userToken:token,
          user:userExits
        }
      }else{
        throw new Error('Username and Password does not match!')
      }
    }
  }catch(err){
    console.log('source' + err)
  }
}
const getUserByToken = async()=>{
  console.log( 'creating user')
}
const updateUserDetails = async()=>{
  console.log( 'creating user')
}

module.exports = {
createUser, 
updateUserDetails,
getUser,
getUserByToken
}