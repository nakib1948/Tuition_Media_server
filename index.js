const express = require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app = express()
const port = 5000



app.use(bodyParser.json())
app.use(cors())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Tuition_Media:Tuition_Media@cluster0.qxayaa3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const register = client.db("Tuition_Media").collection("Register");
  const studentpost=client.db("Tuition_Media").collection("Studentpost");
  // perform actions on the collection object
  console.log('db connect')
  app.post('/register',(req,res)=>{
      const regist=req.body;
      register.insertOne(regist)
      .then(result=>{
        console.log(result)

      })
  })


 app.get('/studentLogin',(req,res)=>{
    register.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
 })


 app.post('/studentpost',(req,res)=>{
  const regist=req.body;
  studentpost.insertOne(regist)
  .then(result=>{
    console.log(result)

  })
})

app.get('/studentpostget',(req,res)=>{
  studentpost.find({})
  .toArray((err,documents)=>{
    res.send(documents)
  })
})




});






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)