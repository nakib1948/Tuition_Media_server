const express = require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app = express()
const port = 5000
const ObjectId=require('mongodb').ObjectId;
require('dotenv').config()

app.use(bodyParser.json())
app.use(cors())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qxayaa3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const register = client.db("Tuition_Media").collection("Register");
  const studentpost=client.db("Tuition_Media").collection("Studentpost");
  const teacherpost=client.db("Tuition_Media").collection("TeacherPost");
  const relation=client.db("Tuition_Media").collection("Relation");
  // perform actions on the collection object
  console.log('db connect')
  app.post('/register',(req,res)=>{
      const regist=req.body;
      register.insertOne(regist)
      .then(result=>{
        console.log(result)

      })
  })

   app.patch('/updateprofile/:id',(req,res)=>{
    const regist=req.body;
    register.updateOne({_id:ObjectId(req.params.id)},{
      $set:{username:regist.name,password:regist.password,address:regist.address,
        class:regist.class,school:regist.school,image:regist.image,
        mobile:regist.mobile}
    })
    .then(result =>{
      res.send(result.modifiedCount>0)
    })


  })

  app.delete('/deletepost/:id',(req,res)=>{
    teacherpost.deleteOne({_id: ObjectId(req.params.id)})
    .then(result=>{
     res.send(result.deletedCount>0)
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

app.post('/teacherpost',(req,res)=>{
  const regist=req.body;
  teacherpost.insertOne(regist)
  .then(result=>{
    console.log(result)

  })
})

app.get('/teacherpostget',(req,res)=>{
  teacherpost.find({})
  .toArray((err,documents)=>{
    res.send(documents)
  })
})

app.post('/relationpost',(req,res)=>{
  const regist=req.body;
  relation.insertOne(regist)
  .then(result=>{
    console.log(result)

  })
})

app.get('/relationget',(req,res)=>{
  relation.find({})
  .toArray((err,documents)=>{
    res.send(documents)
  })
})




});






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)