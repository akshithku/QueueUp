const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const fs= require("fs")
const jwt=require("jsonwebtoken")

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.set("strictQuery", false);
const List = require("../server/UserSchema");

const appModal = require("./appModal");
const UserSchema = require("./UserSchema");

const Timeslot = require('./timeslot'); 

console.log("mongobd : ",process.env.PORT)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected successfully");
    });
  })
  .catch((err) => {
    console.log(err);
  });


// app.get("/user", async (err, data) => {
//   try{
//     const list = await List.find();
//     data.status(200).send(list);
//   }catch(err){
//     console.log(err)
//   }
  
// });

app.get("/user", async (req, res) => {
  try {
    const list = await List.find().select("-password"); 
    // console.log(list.map(({ password, ...rest }) => rest)); 
    res.status(200).send(list);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/userdata", async (err, data) => {
  const list = await List.find();
  data.status(200).send(list);
});

app.get("/DocList", async (req, res) => {
  // const {data}=req.body;
  // const name=data.HospitalName;
  const datas = await List.find();
  res.status(200).send(datas);
});

app.get("/hosList", async (req, res) => {
  // const {data}=req.body;
  // const name=data.HospitalName;
  // const datas = await List.find().select("HospitalName HospitalsImg");
  const datas = await List.aggregate([
    { $project: { HospitalName: 1, HospitalsImg: 1, City: 1 } } // Used Aggregation instead of find method
  ]);
  
  res.status(200).send(datas);
});

app.get("/hospital/:id", async (req, res) => {
  const { id } = req.params;
  const list = await List.findById(id).select("HospitalName City");
  res.status(200).json(list);
});

app.get("/docSlot/:id", async(req,res)=>{
  const {id}=req.params;
   const list = await List.findById(id).select("Docimg  DoctorName Specialty");
  res.status(200).json(list);
})

app.get("/docBookSlots", async(req,res)=>{
  // const {id}=req.params;
   const list = await appModal.find().select("Name DoctorName  timings Amount UserEmail");
  res.status(200).json(list);
})

app.get("/docQr/:id",async(req,res)=>{
  const {id}=req.params;
   const list = await List.findById(id).select("email QRimg");
  res.status(200).json(list);
})

async function getBookedSlotsForDoctor(doc_id) {
  try {
    const bookedSlots = await appModal.find({ Doc_id: doc_id}); 
    return bookedSlots;
  } catch (error) {
    console.error(error);
    return [];
  }
}

app.get("/bookedSlots/:doc_id",async(req,res)=>{
  try{
    const {doc_id}=req.params;
    // console.log(doc_id)
  const data=await getBookedSlotsForDoctor(doc_id);
  res.status(200).json(data);
  // console.log(data)
  }catch(error){
    console.log(error);
    res.status(500).send("Sever Error");
  }
  
})


app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { Count } = req.body;
  const data = await List.findByIdAndUpdate(
    { _id: id },
    { $set: { Count: Count } },
    { new: true }
  );
  if (!data) {
    return res.status(400).json({ error: "No such Doctor!, Sorry!" });
  }
  res.status(200).json(data);
});

app.get("/doc-login", async(req,res)=>{
  // const {email,HospitalName,password} =req.params;
  const datas = await List.find();
  res.status(200).send(datas);
})


app.post('/slot',(req,res)=>{
  const {DoctorName,Name,timings,Amount,ReferenceCode,Doc_id,UserEmail } = req.body;

  const modal = new appModal()

  modal.DoctorName=DoctorName,
  modal.Name = Name,
  modal.timings=timings,
  modal.Amount=Amount,
  modal.ReferenceCode=ReferenceCode,
  modal.Doc_id=Doc_id,
  modal.UserEmail=UserEmail


  modal.save(async (err, data) => {
    if (err) {
      console.log(err);
    } else {
      
      res.status(200).send(data);
    }
  });

})

// app.post("/register", async (req, res) => {
//   const {
//     DoctorName,
//     Docimg,
//     HospitalName,
//     HospitalsImg,
//     email,
//     password,
//     Specialty,
//     QRimg,
//   } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ msg: "Password and email are required" });
//   if (password.length < 8) {
//     return res
//       .status(400)
//       .json({ msg: "Password should be at least 8 characters long" });
//   }
//   console.log(req.body);

//   const model = new UserSchema({
//  DoctorName,
//  Docimg,
//  HospitalName,
//  HospitalsImg,
//  email,
//  password,
// Specialty,
// QRimg,
// Count})

//   const duser = await model.save();

//   if(duser){
//     res.status(201).json({message: "sucess"})
//   }
//   else{
//     res.status(501).json({message: "tryagain"})
//   }
  

//   const user = await UserSchema.findOne({ email });
//   if (user){ 
//     console.log("user fund")
//     return res.status(400).json({ msg: "User already exists" })
// }

//   const newUser = new UserSchema({ email, password });
   
//   bcrypt.hash(password, 8, async (err, hash) => {
//     if (err)
//    {
//     console.log('bcrypt')
//       return res.status(400).json({ msg: "error while saving the password" });
//    }
//       newUser.password = hash;
    // const savedUserRes = await modal.save();
    // console.log(savedUserRes)

    // if (savedUserRes)


    //   return res.status(200).json({ msg: "user is successfully saved" });

  //  const token= jwt.sign(
  //     {id:user._id,email},
  //     'shhh',
  //   )
  // });

  // modal.save(async (err, data) => {
  //   if (err) {
  //     console.log(err);
      
  //   } else {
  //     return res.status(200).send(data).json({ msg: "user is successfully saved" });
  //   }

  // });
// });

app.post('/register', async(req,res)=>{
  const {
    DoctorName,
    Docimg,
    HospitalName,
    HospitalsImg,
    email,
    password,
    Specialty,
    City,
    QRimg,
    Gender,
    Awards,
  } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Password and email are required" });
  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password should be at least 8 characters long" });
  }
  const newpassword= await bcrypt.hash(password,10);
  console.log(req.body);
  try{
    const user = await UserSchema.findOne({ email:email });
  if (user){ 
    console.log("user fund")
    return res.status(400).json({ msg: "User already exists" })
}
     else{
      const model = new UserSchema({
        DoctorName,
        Docimg,
        HospitalName,
        HospitalsImg,
        email,
        password:newpassword,
       Specialty,
       QRimg,
       City,
       Gender,
       Awards,
       Count:0})
       
         const duser = await model.save();
         if(duser){
          res.status(201).json({message: "sucess"})
        }
        else{
          res.status(501).json({message: "tryagain"})
        }
     }
    

  }
  catch (err){
console.log(err);
  }

})

// app.post(`/login`, async (req, res) => {
//   const { email, password } = req.body

//   if (!email && !password) {
//     res.status(400)
//     .json({ msg: 'Something missing' })
//   }

//   const user = await UserSchema.findOne({email:email})
//   if (!user) {
//     return res.status(400)
//     .json({ msg: 'User not found' })
//   }

//   const matchPassword = await bcrypt.compare(password, user.password)
//   if (matchPassword) {
//     const userSession = { email: user.email }
//     req.session.user = userSession;

//     return res
//       .status(200)
//       .json({ msg: 'You have logged in successfully', userSession })
      
//   } else {
//     return res.status(400).json({ msg: 'Invalid credential' })
//   }

// })

app.post(`/login`, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Missing email or password' });
  }

  try {
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const userSession = { email: user.email };
    req.session.user = userSession;

    return res.status(200).json({ msg: 'You have logged in successfully', userSession });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }

});


app.post('/create-slot', async (req, res) => {
  try {
    const { doctorId, slots } = req.body;

    let doctorBooking = await Timeslot.findOne({ doctorId });
    if (!doctorBooking) {
      doctorBooking = new Timeslot({
        doctorId: doctorId,
        slots: slots
      });
    } else {
      doctorBooking.slots = doctorBooking.slots.concat(slots);
    }
    await doctorBooking.save();
    res.status(201).json({ message: 'Slots created successfully', slots: doctorBooking.slots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/doccreatedSlots/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctorBookings = await Timeslot.find({ doctorId }).select("slots booked");
    res.status(200).json(doctorBookings);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});




















// fs.writeFileSync("bio.txt","Created  Fs modules !")

// fs.appendFileSync("bio.txt"," Used successfully !!")

// const fsdata=fs.readFileSync("bio.txt","utf-8");
// console.log(fsdata)




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
