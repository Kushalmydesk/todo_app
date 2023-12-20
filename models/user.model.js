import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        
    },
    taskAssigned: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Task"
    }

},{timestamps:true});


module.exports = mongoose.models.Users || mongoose.model("Users" , userSchema);