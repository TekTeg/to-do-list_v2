const client = require('./client.cjs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createUser = async(userData)=>{
  console.log(userData.email)
  try{
    const {rows:userExits} = await client.query (`
      SELECT * FROM users WHERE email = '${userData.email}';
      `)
    console.log('checking email')
    console.log(rows)
    if(userExits) {
      throw new Error('User with this email already exists');
    }
    else{
      const encryptedPassword = await bcrypt.hash(userData.password, 10)
      const {rows:user} = await client.query (`
        INSERT INTO TABLE users ( email, password, gender, age, sleep_pattern)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `, [userData.email, encryptedPassword, userData.gender, userData.age, userData.sleepPattern]);
      return user
    }
            
  }catch(err){
    console.log('Error creating user. '+ err)
  }
}
const updateUserDetails = async()=>{
  console.log( 'creating user')
}
const getUser = async()=>{
  console.log( 'creating user')
}
const getUserByToken = async()=>{
  console.log( 'creating user')
}


module.exports = {
createUser, 
updateUserDetails,
getUser,
getUserByToken
}