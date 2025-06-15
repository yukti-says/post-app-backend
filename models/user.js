const mongoose = require('mongoose')



const userSchema = mongoose.Schema({
    username: String,
    name: String,
    age: Number,
    email: String,
    password: String,
    profilepic: {
        type: String,
        default:"image.png"
    },
    posts: [
        {
            type:mongoose.Schema.Types.ObjectId , ref:"post"
        }
    ]
    
})



module.exports = mongoose.model('user' , userSchema)