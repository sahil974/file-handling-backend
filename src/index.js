import dotenv from 'dotenv'
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
    path: './.env'
})



connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("Error while connectDB in index.js", error)
            throw error
        })

        app.listen(8080, () => {
            console.log("Listening to port 8080");
        })
    })
    .catch((error) => {
        console.log("Mongodb connection failed !!!", error);
    })


app.get("/", (req, res) => {
    res.send("hello")
})