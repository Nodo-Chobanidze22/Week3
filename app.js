import express from 'express';
import morgan from 'morgan';
import userRouter from './Router/userRouter.js';
import productRouter from './Router/productRouter.js';
import { rateLimit } from 'express-rate-limit'
import dotenv from 'dotenv';
dotenv.config({path: './config.env'});

const app = express();

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 10, 
    standardHeaders: true,
    legacyHeaders: false,
});



app.use(limiter); 

app.use(express.json());
if(process.env.NODE_ENV === "development"){
   app.use(morgan("dev"));
   console.log(process.env.NODE_ENV)
}
if(process.env.NODE_ENV === "production"){
   console.log(process.env.NODE_ENV)
 }


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

export default app;