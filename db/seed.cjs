const client = require ('./client.cjs')
const {createUser} = require ('./users.cjs')
const {createTask} = require ('./tasks.cjs')
const dropTables =async()=>{
  try{
    await client.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS tasks;
      `)
    
  }catch (err){
    console.log('Error dropping tables. ' + err)
  }
}

const createTables=async()=>{
  try{
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        gender VARCHAR,
        age INT,
        sleep_pattern VARCHAR
      );
      CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        category VARCHAR NOT NULL,
        task VARCHAR NOT NULL,
        due_date VARCHAR NOT NULL,
        task_place_distance INT,
        tast_estimated_duration VARCHAR NOT NULL,
        solo_or_group VARCHAR NOT NULL
      );

      `)
  }catch(err){
    console.log('error creating Table. ' + err )
  }
  
}

const seedAndSync= async()=>{
  console.log('1 connecting to DB ')
  client.connect()
  console.log('2 connected to DB ')
  console.log('3 dropping tables')
  await dropTables()
  console.log('4 dropped tables')
  console.log('5 creating tables')
  await createTables()
  console.log('6 table created')
  await createUser()
  console.log('7 user created')
  await createTask()
  console.log('8 task created')
  console.log('9 disconnection from the DB')
  client.end()
  console.log('10 disconnected from the DB')
}
seedAndSync()