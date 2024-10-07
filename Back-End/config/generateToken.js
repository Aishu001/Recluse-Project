import jwt from 'jsonwebtoken';
export function generateToken(getTheID , res){
    return jwt.sign({getTheID} , process.env.SECRET_KEY )
  
}


