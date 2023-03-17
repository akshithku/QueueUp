
const cors=require("cors")
const express = require("express")
const mongoose = require("mongoose")
const bcrypt=require("bcrypt")

const app=express();

app.use(cors());
app.use(express.json())

// mongoose.connect('mongodb+srv://akshithkumarkarla:9390733656a@queueup.qaqkgtb.mongodb.net/test')

mongoose.set("strictQuery",false)
const List = require('../server/UserSchema')

const appModal=require("./appModal");
const UserSchema = require('./UserSchema')

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
  

app.get('/User',async(err,data)=>{
   const list = await List.find()
    data.status(200).send(list)
})

app.get('/Userdata',async(err,data)=>{
  const list = await List.find()
   data.status(200).send(list)
})

app.get("/HosList",async(req,res)=>{
  const {data}=req.body;
  const name=data.HospitalName;
  const datas = await List.find({HospitalName:name})
  res.status(200).send(datas)
})


// app.post('/user',(req,res)=>{
//   const {Docimg,name,specialist,timings,count } = req.body;

//   const modal = new appModal()
  
//   modal.Docimg=Docimg,
//   modal.name = name,
//   modal.specialist=specialist,
//   modal.timings=timings,
//   modal.count=count

//   modal.save(async (err,data)=>{
//     if(err){
//       console.log(req);
//     }
//     else{
//       res.send(modal).status(200);
//     }
//   })

  
// })




app.post('/register', async (req, res) => {
  const {DoctorName,Docimg,HospitalName,HospitalsImg,email,password,Specialty,Count} = req.body
  console.log(req.body)

  const modal = new UserSchema();
  modal.DoctorName=DoctorName,
  modal.Docimg=Docimg,
  modal.HospitalName=HospitalName,
  modal.HospitalsImg=HospitalsImg,
  modal.email=email,
  modal.password=password,
  modal.Specialty=Specialty,
  modal.Count=Count

  if (!email || !password)
    return res.status(400).json({ msg: 'Password and email are required' })

  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: 'Password should be at least 8 characters long' })
  }

  const user = await UserSchema.findOne({ email })
  if (user) return res.status(400).json({ msg: 'User already exists' })

  const newUser = new UserSchema({ email, password })
  bcrypt.hash(password, 7, async (err, hash) => {
    if (err)
      return res.status(400).json({ msg: 'error while saving the password' })

    newUser.password = hash
    const savedUserRes = await newUser.save()

    if (savedUserRes)
      return res.status(200).json({ msg: 'user is successfully saved' })
  })

  modal.save(async (err,data)=>{
        if(err){
          console.log(err);
        }
        else{
          res.status(200).send(data)
        }
      })
    

})


app.post(`/login`, async (req, res) => {
  const { userId, password } = req.body

  if (!userId || !password) {
    res.status(400).json({ msg: 'Something missing' })
  }

  const user = await UserSchema.findOne({ userId: userId }) 
  if (!user) {
    return res.status(400).json({ msg: 'User not found' })
  }

  const matchPassword = await bcrypt.compare(password, user.password)
  if (matchPassword) {
    const userSession = { userId: user.userId } 
    req.session.user = userSession 

    return res
      .status(200)
      .json({ msg: 'You have logged in successfully', userSession }) 
  } else {
    return res.status(400).json({ msg: 'Invalid credential' })
  }
})



// const getDocument = async()=>{
//   try{const result = await appModal
//   .find({$and:[{name: "akshith"}, {count:"2"}]})
//   .select({name:1})
//   .sort("name:1"); 
//   console.log(result);
// }catch(err){
// console.log(err)
// }
// }
// getDocument();
// app.listen(8000,()=>{
//   console.log("listenig to the port 8000")
// })



// app.listen(9000,(err,data)=>{
//       console.log('Running...')
// });


// const deleteDocument=async(_id)=>{
//   try{
//     const result= await appModal.findByIdAndDelete({_id});
//    console.log(result)
//   }catch(err){
//     console.log(err)
//   }
  
// }

// deleteDocument("6406e76718272692f4740687");