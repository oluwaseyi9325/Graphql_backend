const mongoose=require("mongoose");

const bookSchema= mongoose.Schema({
    name:{type:String},
    genre:{type:String},
    authorId:{type:String}
})


const bookModel= mongoose.model("book_models",bookSchema)


module.exports = { bookModel };