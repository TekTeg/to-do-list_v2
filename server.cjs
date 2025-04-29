const express = require ('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))

app.use('/api/v1', require('./api/index.cjs'))

// app.get('*', async (req, res, next) => {
//   res.sendFile(__dirname + '/dist/index.html')
// })

app.get('/', async(req, res, next)=>{
  res.sendFile(__dirname + '/dist/index.html')
})
const PORT = 3000;
app.listen (PORT, ()=>{console.log(`listening at  Port: ${PORT}` )}) 