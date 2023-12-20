
import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/task.model";

const getTask = async(req, res) => {
    try{
        await dbConnect();
        const alltask = await Task.find({});
        res.status(200).json(alltask);

    }catch(err){
        console.log(err)
    }

}


export default getTask;
