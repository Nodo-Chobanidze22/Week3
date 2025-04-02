import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;

const DB_URL = process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASS).replace("<USERNAME>", process.env.DB_USER)

mongoose.connect(DB_URL).then(() => {
    console.log("Connected to the database")
}).catch((err) => {
    console.log(err);
});

app.listen(PORT, () => {
    console.log("Server is running on port 3000")
});