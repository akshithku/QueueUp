const express = require("express")
const mongoose = require("mongoose")

const app=express();

mongoose.connect('mongodb+srv://akshithkumarkarla:9390733656a@queueup.qaqkgtb.mongodb.net/test')
  
app.get('/',(err,data)=>{
  data.send("hello world")
})

app.get('/alien',(err,data)=>{
     const id=err.query.id
    data.send("hello aliens and welcome")
  })


app.get('/alien/:name/:id',(err,data)=>{
    const name=err.params.name
    const id =err.params.id;
    data.send(`hey ${name}${id}`)
})

app.listen(9000,(err,data)=>{
      console.log('Running...')
});