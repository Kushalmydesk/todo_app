import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
},{
    timestamps: true,
});


module.exports = mongoose.models.Tasks || mongoose.model("Tasks", taskSchema);