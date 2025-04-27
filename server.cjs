const express = require ('express')
const app = express()
app.use(express.json())
app.use('/api/v1', require('./api/index.cjs'))
app.get('/', async(req,res,next)=>{
  await res.send('I am working')
})
const PORT = 3000;
app.listen (PORT, ()=>{console.log(`listening at  Port: ${PORT}` )}) 