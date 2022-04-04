const express= require('express');
const router=express.Router();
const {Meal}= require('../models/meal');
const { User } = require('../models/user');


/**
 * Post method for adding a new meal
 */
router.post(`/`,async (req,res)=>{
    let newMeal=new Meal({
        name:req.body.name,
        calories:req.body.calories,
        email:req.body.email,
        created_at:req.body.created_at
        
    })
    newMeal= await newMeal.save();

    if(!newMeal){
        return res.status(404).send({message:'Unable to create meal.'})
    }
    res.status(200).send(newMeal);
    });
  


/**
 * Delete method for removing a meal by id
 */
router.delete('/:id',(req,res)=>{
Meal.findByIdAndRemove(req.params.id).then (meal=>{
    if(meal){
        return res.status(200).json({success:true, message:"meal is deleted."});
    }
    else{
        return res.status(404).json({success:false, message:"meal not found."});
    }
} ).catch(err=>{
    return res.status(400).json({success:false, error:err})
});
});


/**
 * Getting list of meals  for meals listing
 */
router.get('/:userEmail', async (req,res)=>{
    const user=await User.findOne({email:req.params.userEmail});
   // console.log(user);
   if(!user){
       return  res.status(400).json({success:false,message:'No meals available.'})
   }
    let mealList;
    if(user.isAdmin){
       mealList=await Meal.find().sort({created_at:-1});
    }
    else{
        mealList=await Meal.find().where('email').equals(req.params.userEmail).sort({created_at:-1})
    }
    
    if(!mealList){
        res.status(500).json({success:false})
    }
    res.status(200).send(mealList);
});



/**
 * Getting a meal by id
 */
router.get('/:id', async (req,res)=>{
    const meal= await Meal.findById(req.params.id);
    if(!meal){
        res.status(500).json({message:'The meal with given id was not found'});
    }
    res.status(200).send(meal);
});


/**
 * Editing and updating a meal
 */
router.put('/:id', async (req,res)=>{
   // const mealUser=await User.findOne({email:req.body.email});


    const newMeal = await Meal.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            calories: req.body.calories,

        },
        {new:true});

        if(!newMeal){
            return res.status(404).send({message:'Unable to edit meal.'})
        }
        res.status(200).send(newMeal);
})

module.exports =router;
