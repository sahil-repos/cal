const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const { Meal } = require('../models/meal');

/**
 * Get all users
 */
router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-passwordHash');

    if(!userList) {
        res.status(404).json({message: "No Userlist found."})
    } 
    res.status(200).send(userList);
});

/**
 * Get a user by id
 */
router.get('/:id', async (req, res) =>{
    const user= await User.findById(req.params.id).select('-passwordHash');

    if(!user) {
        res.status(404).json({success: false, message:'User not found.'})
    } 
    res.status(200).send(user);
});

/**
 * Add a new user
 */
router.post('/',async (req,res)=>{
    const existingUser= await User.findOne({email:req.body.email});
    if(existingUser){
        return res.status(400).send({message:'Email already exists.'});
    }
    let user= new User({
        name:req.body.name,
        email:req.body.email,
        passwordHash:bcrypt.hashSync(req.body.password,10),
        isAdmin:req.body.isAdmin
    });
    user= await user.save();

    if(!user){
        return res.status(400).send({message:'Unable to add User.'});
    }
    res.status(200).send(user);
});


/**
 * Update a user record
 */
router.put('/:id', async (req,res)=>{
    const userExists= await User.findById(req.params.id);
    const emailExists= await User.findOne({email:req.body.email});
    if(emailExists && emailExists.id !== req.params.id){
        return res.status(400).send({message:'Email already exists.'});
    }
    let newPassword;
    if(req.body.password){
        newPassword=bcrypt.hashSync(req.body.password,10)
    }
    else{
        newPassword=userExists.passwordHash;
    }

    const user = await User.findByIdAndUpdate(req.params.id,
        {
        name:req.body.name,
        email:req.body.email,
        passwordHash:newPassword,
        isAdmin:req.body.isAdmin

        },
        {new:true});

        if(!user){
            return res.status(404).send({message:'Unable to edit meal'})
        }
        res.status(200).send(user);
});


/**
 * Login in to application
 */
router.post('/login', async (req,res)=>{
    const user= await User.findOne({email:req.body.email});
    const secret= process.env.secret;
    if(!user){
        return res.status(404).send({message:'User not found.'});
    }
    if(user && bcrypt.compareSync(req.body.password,user.passwordHash)){
        const token =jwt.sign(
            {
                userEmail:user.email,
                isAdmin:user.isAdmin
            },
            secret,
            {
                expiresIn:'1d'
            }
        )
        res.status(200).send({user:user.email,isAdmin:user.isAdmin ,token:token});
    }
    else{
        res.status(400).send({message:'Invalid Password'});
    }
});

/***
 * Sign Up endpoint
 */
router.post('/signup', async (req,res)=>{
    const existingUser= await User.findOne({email:req.body.email});
    if(existingUser){
        return res.status(400).send({message:'Email already exists.'});
    }
    const secret= process.env.secret;
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10 ),
        isAdmin: req.body.isAdmin || false,
        
    })
    user = await user.save();

    if(!user){
    return res.status(500).send({message:'the user cannot be created!'});
    }

    res.status(200).send(user);
})


/**
 * Delete a user by id
 */
router.delete('/:id', async (req, res)=>{
    await User.findByIdAndRemove(req.params.id).then(user =>{
        if(user) {
            //deleting meal of deleted user
            Meal.deleteMany({email:user.email }).then(function(){
            }).catch(function(error){
            });
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;