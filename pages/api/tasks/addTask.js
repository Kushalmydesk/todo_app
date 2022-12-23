
import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/task.model";

//this api is for adding new task
const addTask = async(req,res) => {
    try {
        await dbConnect();
        
        const newTask = new Task(req.body)
       
        const createdTask = await newTask.save();
        res.status(201).json(createdTask)

    } catch (error) {
        console.log(error)
    }
}

export default addTask;



