const mongoose=require("mongoose");

const authorSchema= mongoose.Schema({
    name:{type:String},
    age:{type:Number},
    
})


const authorModel= mongoose.model("author_models",authorSchema)


module.exports = { authorModel };

