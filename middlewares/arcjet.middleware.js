import aj from '../config/arcjet.js';
import { isSpoofedBot } from "@arcjet/inspect";
 
 
 const arcjetMiddleware =async (req,res,next)=>{ 
  try{
 const decision= await aj.protect(req, { requested: 1 }); // Deduct 1 tokens from the bucket
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      res.writeHead(429, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Too Many Requests" }));
    } else if (decision.reason.isBot()) {
      return res.status(403).json({ success: false, error: "No bots allowed" });
    } else {
      res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Forbidden" }));
    }
  } 
    next();
  }
    catch(error){
console.error("Arcjet Middleware Error:", error);
      next(error); 
    }
    
 
     
  }
  export default arcjetMiddleware