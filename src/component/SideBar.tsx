import SuggestionItem from "./SideSection";
import {GET_USERS} from '../Graphql/Queries'
import { useQuery ,gql} from '@apollo/client';
import { useEffect, useState } from "react";
import { log } from "console";

export default function SideBar() {

    const { loading: usersLoading, error: usersError, data: userData } = useQuery(GET_USERS);
    const [post,setPost]=useState<any>();
    const [userlist,setUserlist]=useState<any>([]);
    let posts:any=[];
    let users:any=[];

    useEffect(() => {
    
    
        if(userData){
             users= userData.getAllUsers;
            console.log("side users list",users);
            
            setUserlist(users);
            console.log("test",userlist);
            
        }
      
        return () => {
          
        }
      }, [userData])
    
    return (
      
        <div className="mt-6">
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-semibold text-gray-400">Suggestion for you</p>
        <button type="button" className="text-xs font-semibold">
          See all
        </button>
      </div>
     


          <SuggestionItem
            key=''
            username=''
            companyName=''
            avatar=''
          />
          <SuggestionItem
            key=''
            username=''
            companyName=''
            avatar=''
          />
          <SuggestionItem
            key=''
            username=''
            companyName=''
            avatar=''
          />
        
    </div>
       
    );
  }
  