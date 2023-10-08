import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
  } from '@heroicons/react/outline';
//   import Image from 'next/image';
import Test from './test.jpg'
import {COMMENT_UPLOAD} from '../Graphql/Mutations'
import { useEffect, useState } from 'react';
import {useMutation, useQuery} from '@apollo/client'
import {FETCH_COMMENTS} from '../Graphql/Queries'
  
  interface PostItemProps {
    username: string;
    // userImg: string;
    imgPost: string;
    caption: string;
    id:string;
    user:string
  }
  export default function PostItem(props: PostItemProps) {

    const [uploadComment,{error}]=useMutation(COMMENT_UPLOAD);

    

    const { username,  imgPost, caption ,id,user} = props;
    const [comment,setComment]=useState<string>();

    const [comments,setComments]=useState();
    const { loading, error:commentError, data } = useQuery(FETCH_COMMENTS, {
      variables: { id:id  }, 
    });

useEffect(() => {
  
  if(data)
    

  return () => {
    
  }
}, [])



    

    const postComment=()=>{
      uploadComment({
        variables:{
            text:comment,
            username:user,
            postId:id
        }
    })
    if(error){
        console.log(error);
    }
      setComment("");
  }
  useEffect(() => {
    console.log("post data",user,id);
    
  
    return () => {
      
    }
  }, [])
  
    return (

      <section className="col-span-2">
      <div className="bg-white shadow-sm border border-gray-200 rounded-md my-5" >
        {/* Profile */}
        <div className="flex justify-between items-center space-x-2 p-4">
          <div className="flex-shrink-0 mr-2">
            
          </div>
          <p className="flex-1 text-sm hover:underline cursor-pointer font-semibold">{username}</p>
          <DotsHorizontalIcon className="w-5 h-5 cursor-pointer" />
        </div>
  
        {/* Post Image */}
        <img src={imgPost} className="w-full object-cover" alt='username' />
        {/* Button */}
        <div className="flex justify-between items-center pt-4 px-4">
          <div className="flex items-center space-x-4">
            <HeartIcon className="w-8 h-8 cursor-pointer hover:text-gray-700 transition" />
            <ChatIcon className="w-8 h-8 cursor-pointer hover:text-gray-700 transition" />
            <PaperAirplaneIcon className="w-8 h-8 cursor-pointer hover:text-gray-700 transition" />
          </div>
          <BookmarkIcon className="w-8 h-8 cursor-pointer hover:text-gray-700 transition" />
        </div>
  
        {/* Caption */}
        <p className="p-5 truncate">
          <span className="font-bold mr-1">{username}</span>
          {caption}
          {/* hi there */}
        </p>
  
        {/* Input Comment */}
        <form className="flex items-center space-x-2 p-4 border-t border-gray-200">
          <EmojiHappyIcon className="w-8 h-8" />
          <input
            type="text"
            className="flex-1 border-none focus:outline-none focus:ring-0"
            placeholder="Add a comment..."
            onChange={(e)=>setComment(e.target.value)}
            />
          <button type="button" className="text-blue-400 font-semibold" onClick={postComment}>
            Post
          </button>
        </form>
      </div>
      </section>
    );
  }