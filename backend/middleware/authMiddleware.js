import jwt from 'jsonwebtoken';

export const auth = async (req,res,next)=>{
    const token = req.headers["authorization"].split(' ')[1];
    if(!token){
        return res
            .status(401)
            .send({message:'No token, authorization denied', success: false});
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        return res
            .status(400)
            .send({message:'Token is not valid'});
    }
}