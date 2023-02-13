import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
const router = express.Router();
const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//@desc     Register new user
//@route    POST /api/users
//@access   Public
router.post('/register',async (req,res)=>{
    try {
        const userExists = await User.findOne({email:req.body.email});
        if(userExists){
            res.status(200).send({message:'User already exists',success:false});
        }  
        const password = req.body.password;    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send({message:'User created successfully',success:true});
    } catch (error) {
        res.status(500).send({message:'Something went wrong',success:false, error});
        
    }
})


router.post('/login',async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

export default router;