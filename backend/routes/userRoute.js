import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {auth} from '../middleware/authMiddleware.js';
const router = express.Router();


//@desc     Register new user
//@route    POST /api/users
//@access   Public
router.post('/register',async (req,res)=>{
    try {
        const userExists = await User.findOne({email:req.body.email});
        if(userExists){
            res
                .status(200)
                .send({message:'User already exists',success:false});
        }  
        const password = req.body.password;    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res
            .status(200)
            .send({message:'User created successfully',success:true});
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .send({message:'Something went wrong',success:false, error});    
    }
})

//@desc     log new user
//@route    POST /api/users
//@access   Public
router.post('/login', async (req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res
                .status(200)
                .send({message:'User not found',success:false});
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            return res
                .status(200)
                .send({message:'Invalid credentials',success:false});
        }else{
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
                expiresIn:process.env.JWT_EXPIRES_IN
            });
            res.status(200)
                .send({
                    message:'User logged in successfully',
                    success:true,
                    data:token
                });
        }
        
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .send({message:'Something went wrong',success:false, error});
    }
})

router.post('/user-data', auth, async(req, res)=>{
    try {
        const user = await User.findById({ _id: req.body.userId });
        if(!user){
            return res
                .status(200)
                .send({message:'User not found',success:false});
        } else {
        res.status(200)
            .send({
                message:'User data fetched successfully',
                success:true,
                data:{
                    name: user.name,
                    email: user.email
                }
            });
        }
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .send({message:'Something went wrong',success:false, error});
    }
})

export default router;