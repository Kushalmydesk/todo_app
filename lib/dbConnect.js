import mongoose from "mongoose";

const dbConnect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to DB")
    } catch (err) {
        console.log(err);
    }
}


export default dbConnect;