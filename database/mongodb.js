import mongoose from 'mongoose';
import {DB_URL,NODE_ENV} from '../config/env.js' ;
import dns from 'node:dns/promises';
dns.setServers(['1.1.1.1', '8.8.8.8']); 
if(!DB_URL){ throw new ERROR('Please define the MONGODB_URL environment variable inside .env.<development|production>.local')}
const connectToDatabase= async()=>{
    try{
       await mongoose.connect(DB_URL);
       console.log(`MongoDB connected successfully in ${NODE_ENV} mode`);
      
    }catch(error){
        console.error('Error connecting to database:', error);
        process.exit(1);
    }

}
export default connectToDatabase;


