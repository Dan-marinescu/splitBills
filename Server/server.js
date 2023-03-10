const express = require('express')
const mongoose = require("mongoose");
const app = express()
const cors = require('cors');
require('dotenv').config({path:__dirname+'/.env'})
const bodyParser = require('body-parser')

const Table = require(`${__dirname}/Models/Table`)
const url = process.env.CONNECTION_URL;
const port = process.env.PORT


// const objsArray =[{
//     id:1,
//   name:"A",
//   amount:0,
//   selected:false  
// },{
//     id:2,
//     name:"D",
//     amount:0,
//     selected:false
//   },{
//     id:3,
//     name:"B",
//     amount:0  ,
//     selected:true
//   },{
//     id:4,
//     name:"C",
//     amount:0 ,
//     selected:true 
//   }
// ]
app.use(bodyParser.json())
app.use(cors());
app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.get('/data', async (req, res) => {
    console.log("here")
    const objsArray = await Table.getAllData()
    if(!objsArray)
    return res.send([]);
    return res.send({objsArray});
})

app.post('/update',async (req,res)=>{
  Table.update(req.body.dataToSend);
  // console.log(Table.getAllData().then(data=>{console.log(data)}))
  res.send("ok")
})
app.listen(port, async () => {
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  await mongoose.connection.db

  console.log(`Server is listening on port: ${port}`)
})