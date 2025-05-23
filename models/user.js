const {Schema,model}=require('mongoose')
const {createHmac,randomBytes}=require('crypto')
const { type } = require('os')
const {createTokenForuser,validateToken}=require('../services/authentication')
const userSchema=new Schema({
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    
    },
    salt:{
        type:String,
    },
    profileImageURL:{
        type:String,
        default:'/public/images/default.png',
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }

},{timestamps:true})

userSchema.pre('save',function (next){
    const user=this
    if(!user.isModified('password')) return;

    const salt=randomBytes(16).toString()
    const hashedpwd=createHmac('sha256',salt).update(user.password).digest('hex')

    this.salt=salt
    this.password=hashedpwd

    next()
})

userSchema.static('matchPasswordAndGenerateToken', async function(email,password){
    const user=await this.findOne({email})
    if (!user) throw new Error('User not found')
    
    const salt=user.salt
    const hashedpwd=user.password

    const userProvidedHash=createHmac('sha256',salt)
    .update(password)
    .digest('hex')

    if(hashedpwd!==userProvidedHash) throw new Error('Incorrect password')

    const token=createTokenForuser(user)

    return token

})

const User=model('user',userSchema)
module.exports=User;