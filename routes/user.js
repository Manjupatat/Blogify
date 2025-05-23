const {Router}=require('express')
const User=require('../models/user')
const { redirect } = require('react-router-dom')
const router=Router()

router.get('/register',(req,res)=>{
    return res.render('register')

})

router.get('/login',(req,res)=>{
    return res.render('login')
    
})

router.post('/register',async(req,res)=>{
    // console.log(req.body)
    const { fullName, email, password }=req.body
    if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newUser = new User({ fullName, email, password });
    await newUser.save();
    return res.redirect('/')
    // res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
    // return res.redirect('/')

})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body
    console.log(req.body)
    try{
        const token=await User.matchPasswordAndGenerateToken(email,password)

    // console.log('token',token)
    return res.cookie('token',token).redirect('/')
    }
    catch(error){
return res.render('login',{
    error:'incorrect email or password'
})
    }
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/')
})


// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Validate input
//   if (!email || !password) {
//     return res.status(400).json({ error: "All fields are required." });
//   }

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: "Invalid email or password." });
//     }

//     // Check password (note: in production, use hashed passwords)
//     if (user.password !== password) {
//       return res.status(401).json({ error: "Invalid email or password." });
//     }

//     // Login success
//     return res.render('Home', { user }); // or redirect or send a token, etc.
//     // return res.redirect('/dashboard'); // example
//   } catch (err) {
//     res.status(500).json({ error: "Server error." });
//   }
// });



module.exports=router