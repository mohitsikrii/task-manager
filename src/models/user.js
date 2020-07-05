const mongoose = require('mongoose')
const validator= require('validator')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const jwt = require('jwt-simple')

const { request } = require('express')
const Tasks= require("./tasks")



const userSchema =new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        trim: true
},
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value)
        {
            if(!validator.isEmail(value)){
                throw new Error('Provide a valid email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length<7)
            throw new Error('Password must atleast be 7 characters long!')
        }
    },
    // avatar:{
    //     type:Buffer
    // },
    age: {
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number')

            }
        },
    
},
tokens:[{
    token:{
        type:String,
        required:true
    }
}],

},
{
    timestamps:true
}
)


userSchema.virtual('tasks',{
    ref:'Tasks',
    foreignField:'owner',
    localField:'_id'
})

userSchema.methods.toJSON= function (){
    const userObject =this.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}


userSchema.methods.generateAuthToken=async function(){
    // const token = jwt.sign({_id:this._id.toString()},process.env.JWT_TOKEN)
    // this.token = this.token.concat({token})
//==========================================================
    const token = jwt.encode({_id:this._id.toString()},process.env.JWT_TOKEN)
    this.tokens = this.tokens.concat({token})
    
    await this.save()


    return token
}

userSchema.statics.findByCredentials= async(email,password)=>{
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }
    
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            throw new Error('Unable to login!')
        }

  return user
}

userSchema.pre('save', async function(next){

    if(this.isModified('password'))
    {
        this.password= await bcrypt.hash(this.password,8)

    }
   
    next()
})


userSchema.pre('remove', async function(next){
    await Tasks.deleteMany({owner:this._id})
    next()
})

const User = mongoose.model('User',userSchema)
module.exports = User