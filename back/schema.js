const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        type: String,
        __id : String,
        created_on: { type: Date, default: Date.now },
    }
)

const postModel = mongoose.model('posts', PostSchema);

// module.exports = postModel;

const SignupSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password:String,
        address: String,
        contact: Number,
        created_on: { type: Date, default: Date.now },
        
    }
)

const signupModel = mongoose.model('userSignup', SignupSchema);

module.exports = {postModel,signupModel};