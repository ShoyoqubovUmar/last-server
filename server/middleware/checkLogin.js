exports.checkLogin = async(req,res,next)=>{
    const {email, password} = req.body
    if(email && password){
        next()
    }else{
        res.json({title:"error",message:"email or password is not defined"})
    }
} 