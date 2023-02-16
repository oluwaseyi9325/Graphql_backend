const {projects,clients}= require("./sampleData")

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema} = require("graphql");

const ClinetType= new GraphQLObjectType({
    name:"client",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString}
    })
})

const clinetQuery= new GraphQLObjectType({
    name:"ClientQuery",
    fields:{
        clientDetails:{
            type:  new GraphQLList(ClinetType),
            resolve(parent,args){
                return clients;
            }
        },
        getSingleClients:{
            type: ClinetType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args){
                return clients.find((val)=>val.id===args.id)
            }
        }
    }
})

module.exports= new GraphQLSchema({
    query:clinetQuery
})
