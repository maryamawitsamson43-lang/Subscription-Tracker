import express from  'express';
import {PORT} from './config/env.js';
import userRouter from './router/user.routes.js';
import authRouter from './router/auth.routes.js';
import subscriptionRouter from './router/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js'
import workflowRouter from './router/workflow.routes.js'

import cookieParser from "cookie-parser";
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));//the html form data is sent to the server in the body of the request. The express.urlencoded() middleware is used to parse this data and populate the req.body property with the parsed data. The extended option allows you to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The qs library allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.when false, the URL-encoded data will be parsed with the querystring library, which does not support nested objects. When true, the URL-encoded data will be parsed with the qs library, which allows for nested objects and arrays to be encoded into the URL-encoded format.
app.use(cookieParser());//the cookie parser middleware is used to parse the cookies attached to the client request object. It populates the req.cookies property with an object keyed by the cookie names. This allows you to easily access and manipulate cookies in your Express application.
//app.use(arcjetMiddleware);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);
app.use('/api/v1/workflows',workflowRouter)
app.get('/',(req,res)=>{
    res.send("Welcome to the Subscription Tracker API")
})
app.use(errorMiddleware);
app.listen(PORT,async ()=>{
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
    await connectToDatabase();
})
export default app;
console.log(PORT)