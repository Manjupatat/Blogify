const express = require('express')
const ejs=require('ejs')
const cors = require('cors')
const userRoute=require('./routes/user')
const blogRoute=require('./routes/blog')
const {checkForAuthenticationCookie}=require('./middlewares/authentication')
const cookieParser=require('cookie-parser')
const Blog=require('./models/blog')
const PORT =8000
const path=require('path')
const app=express()
const mongoose=require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/blogify').then(e =>{
    console.log('mongodb  is connected')
})

app.set('view engine',"ejs")
app.set("views",path.resolve('./views'))
// app.use(express.cors)
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.join(__dirname,'public')))

app.get("/",async(req,res)=>{
    const allBlogs=(await Blog.find({}))
    res.render('home',{
        user:req.user,
        blogs:allBlogs,
    })
})

app.use('/', userRoute)
app.use('/blog',blogRoute)

app.listen(PORT,()=>{
    console.log(`server is connected at http://localhost:${PORT}`)
})