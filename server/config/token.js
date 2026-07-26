import jwt from "jsonwebtoken"

const genToken=async(userId)=>{
    try{
        const token=jwt.sign({userId},process.env.JWTSECRET,{expiresIn:"7d"})// expire date of token
        return token
    }catch(error){
    console.log(error)
    }


}
export default genToken