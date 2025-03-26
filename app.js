import express from 'express';
import morgan from 'morgan';
import userRouter from './Router/userRouter.js';
import productRouter from './Router/productRouter.js';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit'

const app = express();

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 10, 
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter); 

dotenv.config({path: './config.env'});
app.use(express.json());

app.use(morgan("dev"));

const isMaintenance = false;

app.use((req, res, next) => {
    if(isMaintenance == true){
        return res.json({
            message: "Site is under maintenance"
        })
    }
    next()
})

app.use("/products", productRouter);
app.use("/users", userRouter);


app.listen(process.env.PORT, () => {
    console.log("Server Listening 3000 Port")
});
