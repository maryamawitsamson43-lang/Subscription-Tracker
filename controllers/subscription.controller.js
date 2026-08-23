import Subscription from "../models/Subscription.model.js"
import { workflowClient } from "../config/upstash.js"


export const createSubscription=async(req,res,next)=>{
try{

const subscription =await Subscription.create({
        ...req.body,
        user:req.user._id
    }
    )
   
  
const {workflowRunId}=await workflowClient.trigger({
    url:`${process.env.SERVER_URL}/api/v1/workflows/subscription/reminder`,
    body:{
        subscriptionId:subscription.id,
    },header:{
        'content-type':'application/json',
    },
    retries:0,
})  ;
res.status(201).json({sucess:true,data:subscription,workflowRunId}) }

catch(error){
    next(error)
}

}
    




export const getUserSubscription=async(req,res,next)=>{
    try{

    if(req.user._id !== req.params.id) {
        const error=new Error();
        error.statusCode=401;
        throw error;
        
    }
    const subscriptions=await Subscription.find({user:req.params.id})
    res.status(200).json({sucess:true,data:subscriptions})



    }
    catch(error){
        next(error)
    }


}