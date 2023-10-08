import React, { useEffect, useState } from 'react'
import Nav from './Navbar'
import PostItem from './post'
import { useQuery ,gql} from '@apollo/client';
import {GET_USERS} from '../Graphql/Queries';
import db ,{auth,storage}from '../firebase'
import ImageUpload from './ImageUpload';
import { FETCH_POSTS } from '../Graphql/Queries';
import { log } from 'console';
import SuggestionItem from './SideSection';
import SideBar from './SideBar';

function Home() {

  
  const { loading: usersLoading, error: usersError, data: userData } = useQuery(GET_USERS);
  
  
  const {error,loading,data}=useQuery(FETCH_POSTS);
  const[user,setUser]=useState<any>(null);
  const [post,setPost]=useState<any>();
  const [userlist,setUserlist]=useState<any>();
  let posts:any=[];
  useEffect(() => {
    const fun =async()=>{

     
      console.log("home page");
      
      if(data){
        setPost(data.fetchPosts);
         posts=data.fetchPosts;
        console.log("data",data.fetchPosts[0]);
        // console.log(typeof(post));
        posts.map((post:any)=>console.log("caption",post.caption)
        )
        
        console.log("userdata",userData);

        

        

        
      }else{
        console.log("no data");
        
      }
      
    }
    
    fun();
  
    
  }, [data])




  const fetchUsers=()=>{
    if(userData){
      setUserlist(userData.getAllUsers);
      let users= userData;
      
    }
  }
  

  useEffect(()=>{
    const unSubscribe= auth.onAuthStateChanged((authUser)=>{
       if(authUser){
         setUser(authUser);
        //  console.log(user);
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
    <>

    
    <Nav/>
    <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 md:max-w-3xl xl:max-w-5xl  mx-auto">
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

    <aside className="md:col-span-1 hidden xl:block">
      <div className="fixed top-36">
        
       <SideBar/>
       
        
        
      </div>
    </aside>


    </main>
   
   
    
    <ImageUpload username={user?.displayName}/>

   
    </>
  )
}

export default Home