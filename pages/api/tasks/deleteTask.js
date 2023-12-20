import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/task.model";

//this api is for deleting task
const deleteTask = async(req,res) =>{
    try {
        await dbConnect();

        await Task.findByIdAndDelete(req.body.id);
        res.status(200).send({
            message: 'Task deleted successfully'
        })


    } catch (error) {
        console.log(error)
    }
}


export default deleteTask;