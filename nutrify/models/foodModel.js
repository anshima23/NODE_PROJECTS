const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    name:{
        type:String,
        required:trusted
    },
    calories:{
        type:Number,
        required:true,
    },
   protein:{
        type:Number,
        required:true,
    },
    carbohydrate:{
        type:Number,
        required:true,
    },
    fat:{
        type:Number,
        required:true,
    },
    fiber:{
        type:Number,
        required:true,
    }
},{timestamps=true})