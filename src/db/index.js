import mongoose from "mongoose"



const connectDB = async () => {
    // console.log(process.env.MONGODB_URL);
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/test2`)

        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.host}`)

    } catch (error) {
        console.log("MongoDB connection Error", error)
        process.exit(1)
    }
}

export default connectDB

