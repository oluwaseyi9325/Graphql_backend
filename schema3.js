
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt,GraphQLList, GraphQLNonNull}= require("graphql");
const { authorModel } = require("./models/authorModel");
const { bookModel } = require("./models/bookModel");




const authorsType= new GraphQLObjectType({
    name:"Authors",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},

        authorBook:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return bookList.filter((val)=>val.authorId===parent.id)
                return bookModel.find({
                    authorId:parent.id
                })
            }
        }
        
    })
})

const BookType= new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id: {type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        authorsDetails:{
            type:authorsType,
            resolve(parent,args){
                // return authors.find((val)=>val.id===parent.authorId)

                return authorModel.findById(parent.authorId)
            }
        }
    })
});


const RootQuery= new GraphQLObjectType({
    name:"RootBook",
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // return bookList.find((val)=>val.id===args.id)

                return bookModel.findById(args.id)
            }
        },
        author:{
            type:authorsType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // return authors.find((val)=> val.id===args.id)
                return authorModel.findById(args.id)
            }
        },
        allBook:{
            type:new GraphQLList(BookType),
            resolve(resolve,args){
                // return bookList

                return bookModel.find({})
            }
        },
        allAuthor:{
            type:new GraphQLList(authorsType),
            resolve(parent,args){
                // return authors
                return authorModel.find({})

            }
        },
        getSingleBook:{
            type: BookType,
            args: {id:{type:GraphQLID}},
           async resolve(parent,args){
               
                let dem= await bookModel.findById(args.id)
                console.log(dem)
                return dem
            }
        },
        getSingleAuthor:{
            type:authorsType,
            args:{id:{type:GraphQLID}},
            async resolve(parent,args){
                let dem= await authorModel.findById(args.id)
                console.log(dem)
                return dem
            }
    }}
})

const Mutation= new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addAuthor:{
            type:authorsType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                let saveAuthor= new authorModel({
                    name:args.name,
                    age:args.age
                });
               return saveAuthor.save()
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let saveBook= new bookModel({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                });
                return saveBook.save()
            }
        },
        delBook:{
            type:BookType,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                return bookModel.findByIdAndDelete(args.id)
            }
        },
    }
})

module.exports= new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})
