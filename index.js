const express= require("express");
const app=express();
const {graphqlHTTP} =require("express-graphql")


app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}))


app.listen(5008,(req,res)=>{
    console.log("App listen on port 5008")
})