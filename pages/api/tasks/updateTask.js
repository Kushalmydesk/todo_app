import dbConnect from '../../../lib/dbConnect';
import Task from "../../../models/task.model";



const putTask = async(req,res) => {

    try {
        await dbConnect();
        await Task.findByIdAndUpdate(req.body.id, {name : req.body.name});
        res.status(200).send({
            message: 'Task updated successfully'
        })



    } catch (error) {
        console.log(error);
    }
}

export default putTask;