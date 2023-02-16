const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema } = require("graphql")

const bookList=[
    {id:"1", name:"Independence textbook",genre:"Version 5v",authorId:"1"},
    {id:"2",name:"Sweetsix",genre:"Version 6v",authorId:"2"},
    {id:"3",name:"Clean code",genre:"Version 9",authorId:"3"},
    {id:"4",name:"SHM Note",genre:"Latest version",authorId:"2"},
    {id:"5",name:"Optics physics",genre:"Old edition",authorId:"3"},
    {id:"6",name:"Modern Physics",genre:"Current latest version by longman",authorId:"3"}
]

const authors=[
    {id:"1",name:"Travesy Brad", age:45},
    {id:"2",name:"Academind", age:45},
    {id:"3",name:"Code novation",age:78}
]

const authorsType= new GraphQLObjectType({
    name:"authors",
    fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    age:{type:GraphQLString}
  })
})

const myQuery= new GraphQLObjectType({
    name:"querys",
    fields:{
        allAuthors:{
            type: new GraphQLList(authorsType),
            resolve(parent,args){
                return authors
            }

        },
        getSignleBook:{
            type: authorsType,
            args: {id:{type:GraphQLList}},
            resolve(parent,args){
                return authors.find(val=>{
                        val.id===args.id
                })
            }
        }
    }
})
module.exports= new GraphQLSchema({
    query:myQuery
})