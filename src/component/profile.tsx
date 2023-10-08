import React, { useEffect, useState } from 'react'
import { FETCH_POSTS } from '../Graphql/Queries';
import { useQuery ,gql} from '@apollo/client';
import db ,{auth,storage}from '../firebase'
import PostItem from './post';



function Profile() {

    const[user,setUser]=useState<any>(null);
    const {error,loading,data}=useQuery(FETCH_POSTS);
    const [post,setPost]=useState<any>();
    let posts=[];
    let myPosts:any=[]



    useEffect(() => {
        const fun =async()=>{
    
          // await setPost(data);
          // console.log("posts",post);
          if(data){
            setPost(data.fetchPosts);
             posts=data.fetchPosts;
            console.log(data.fetchPosts[0].id);
            // console.log(typeof(post));
            posts.map((post:any)=>console.log("caption",post.caption)
            )
    
            

            console.log("myposts",myPosts);
            
            
    
            
          }
          
        }
        
        fun();
      
        
      }, [data])

      useEffect(() => {
        if(post)
        myPosts=post.filter((post:any)=>(post.username===user?.displayName));
      
        return () => {
          
        }
      }, [post])
      

      useEffect(()=>{
        const unSubscribe= auth.onAuthStateChanged((authUser)=>{
           if(authUser){
             setUser(authUser);
             console.log(user.user);
           } else{
                   setUser(null);
           }
         })
       
         return()=>{
           //clean up
           unSubscribe();
         }
       },[user])


  return (
    <div>
    <section className="col-span-2">
    {
      post&&user?(
        post.map((post:any)=>(<PostItem username={post.username} imgPost={post.imageUrl} caption={post.caption} id={post.id} user={user?.displayName}/>)
        )
      ):(
        <p>Nothing to show</p>
      )
        
     
    }

    </section>
    </div>
  )
}

export default Profile