const mongoose=require('mongoose');

const mealSchema= mongoose.Schema({
    name:{type:String,required:true},
    calories:{type:Number, required :true,default:0},
    email:String,
    created_at: { type: Date, default: Date.now }
});

mealSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

mealSchema.set('toJSON',{
    virtuals:true,
});

exports.Meal= mongoose.model('Meal',mealSchema);
exports.mealSchema=mealSchema;


