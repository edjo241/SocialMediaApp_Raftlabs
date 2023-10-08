// import { Button } from '@material-ui/core'
import React, { useState } from 'react'
// import "../styles/ImageUpload.css"
import db, { storage } from '../firebase';
import firebase from 'firebase'
import {IMAGE_UPLOAD} from '../Graphql/Mutations';
import {useMutation} from '@apollo/client'

function ImageUpload({username}) {

    const [image,setImage]=useState(null);
    const [caption,setCaption]=useState("");
    const [progress,setProgress]=useState("");

    const [uploadImage,{error}]=useMutation(IMAGE_UPLOAD);

    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
            console.log(image);
        }
    }

    const handleUpload=()=>{
        console.log(username);
        console.log(caption);
        console.log(image);

        // uploadImage({
        //     variables:{
        //         image:image,
        //         caption:caption,
        //         username:username
        //     }
        // })
        // if(error){
        //     console.log(error);
        // }

        const uploadTask=storage.ref(`images/${image?.name}`).put(image);
        uploadTask.on(
            "state_changes",
            (snapshot)=>{
                //progress function
                const progress=Math.random(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                )
                setProgress(progress);
            },
            (error)=>{
                console.log(error);
                alert(error.messages);
            },
            //complete function
            ()=>{
                storage.ref("images").child(image?.name).getDownloadURL()
                .then(url=>{
                    //post image in db
                    db.collection("posts").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        imageUrl:url,
                        username:username
                    })
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                })
            }
        )
    }
    return (
        <div className="imageupload">
            <progress  className='imageupload__progress' value={progress} max="100"/>
            <input type="text" placeholder="Enter a Caption..." value={caption} onChange={(e)=>setCaption(e.target.value)}/>
            <input type="file" onChange={handleChange}/>
            <button type='button' className="imageupload__button" onClick={handleUpload}  variant="contained" color="primary">Upload</button>
        </div>
    )
}

export default ImageUpload
