
const express = require("express")
const mongoose = require("mongoose")

const app=express();

app.use(express.json())

// mongoose.connect('mongodb+srv://akshithkumarkarla:9390733656a@queueup.qaqkgtb.mongodb.net/test')

mongoose.set("strictQuery",false)

const appModal=require("./appModal");

mongoose.connect("mongodb://localhost/DocsInfo",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4
})
.then(()=>{
  app.listen(2917,()=>{
    console.log("connected successfully")
  })
})
.catch((err)=>{
  console.log(err)
})
  

app.get('/user',async(err,data)=>{
   const list=list.find()
    data.send(200).send(list)
})

app.post('/user',(req,res)=>{
  const {Docimg,name,specialist,timings,count } = req.body;

  const modal = new appModal()
  
  modal.Docimg=Docimg,
  modal.name = name,
  modal.specialist=specialist,
  modal.timings=timings,
  modal.count=count

  modal.save(async (err,data)=>{
    if(err){
      console.log(req);
    }
    else{
      res.send(modal).status(200);
    }
  })

  
})

// app.listen(8000,()=>{
//   console.log("listenig to the port 8000")
// })



// app.listen(9000,(err,data)=>{
//       console.log('Running...')
// });