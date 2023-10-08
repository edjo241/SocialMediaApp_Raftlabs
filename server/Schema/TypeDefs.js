const {gql}=require("apollo-server-express");

const typeDefs=gql `

scalar Upload

input GetDataInput {
    id: ID!
  }
  

type User {
    uid: String!
    email: String!
    displayName: String!
    # Add more user fields as needed
  }

    type Post{
        caption:String!
        imageUrl:String!
        timestamp:String!
        username:String!
        id:String!
    }

    type Comment{
        text:String!
        username:String!
        timestamp:String!
    }

    #Queries

    type Query{
        getAllUsers:[User]

        fetchPosts:[Post]

        fetchComment(id: String!):[Comment]
    }

    #Mutations

    type Mutation {
        createUser(name:String!):User!

        uploadImage(image:Upload!,caption:String!,username:String!):Post!

        uploadComment(text:String!,username:String!,postId:String!):String!
    }

`
module.exports={typeDefs}