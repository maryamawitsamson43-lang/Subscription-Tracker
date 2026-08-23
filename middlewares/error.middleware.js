//Native Error Objects: JavaScript explicitly configures native Error objects differently for security and performance. The internal .message and .stack properties are locked as non-enumerable properties.error.message = err.message;This line is your manual override. By explicitly pointing your finger and saying error.message = ..., you bypass the invisible loop block. You reach directly into the original error structure, grab the hidden sentence text string, and force-type it directly onto your new error object!
const errorMiddleware=(err,req,res,next)=>
{try{
     let error={...err};
    error.message=err.message;
    console.error(error);
    if(err.name==='castError'){
        const message='Resource not found.';
        error=new Error(message);
        error.statusCode=404;
    
    }
    if(err.code===11000){
        const message='Duplicate field value entered.';
        error=new Error(message);
        error.statusCode=400;
    }
     if(err.name==='ValidationError')
    {
        const message=Object.values(err.errors).map(val=>val.message);
        error=new Error(message.join(", " ));
      
        error.statusCode=400;
    }
    res.status(error.statusCode||500).json({succes:false,message:error.message||'Server Error'});       
    console.log(err)
}
   

catch(error){
    next(error);
}}
 export default errorMiddleware;