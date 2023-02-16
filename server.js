const express= require("express");

const {graphqlHTTP}= require("express-graphql")
require("dotenv").config();
const schema= require("./schema3")
const mongoose= require("mongoose")
const cors= require("cors")
const app=express();
app.use(cors())
mongoose.set("strictQuery", false);
mongoose.connect(process.env.URI, (err, res) => {
    if (err) {
      console.log("Cant connect to mongoose")
    }else{
        console.log("Connected to Mongoose")
    }
  });
app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(5000,(req,res)=>{
    console.log("Server running!!!")
})