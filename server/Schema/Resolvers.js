const admin = require('firebase-admin');
const firebase = require('firebase');

const serviceAccount = require('./scapp-db885-firebase-adminsdk-4d0pm-b1949d9841.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://scapp-db885.appspot.com/',
});

const storage = admin.storage().bucket();



const firebaseConfig = {
    apiKey: "AIzaSyCQFAFLKVwzzIP7fbpG64wvzkfaPzUq7QA",
    authDomain: "scapp-db885.firebaseapp.com",
    projectId: "scapp-db885",
    storageBucket: "scapp-db885.appspot.com",
    messagingSenderId: "517216507522",
    appId: "1:517216507522:web:a4eb2d4d43aee31bb5069b",
    measurementId: "G-8Z5HYT3HKG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();


const resolvers = {
    Query: {
    
       
        getAllUsers:async()=>{
            const listUsersResult = await admin.auth().listUsers();
            return listUsersResult.users;

        },

        fetchPosts: async () => {
            const postCollection = db.collection('posts');

            const postSnapShot = await postCollection.get();
            const posts = [];

            postSnapShot.forEach((doc) => {
                const post = doc.data();
                console.log("doc id",doc.id,);
                posts.push({
                   id:doc.id,
                    ...post,
                }
                   )

            })
            console.log(posts);
            return posts;

        },

        fetchComment:async(parent, args, context, info)=>{
            const { id } = args;
            const comments=[];
            db.collection("posts").doc(id).collection("comments").orderBy("timestamp","desc").onSnapshot(snapshoot=>{
                snapshoot.docs.map(doc=>
                    comments.push(
                        doc.data()
                    )
                    
                    )
            })
            return comments;
        }

        
    },

    


    Mutation: {
        createUser(parent, args) {

            const newUser = args;
            db.collection('user').add(args);
            return newUser;
        },

        uploadImage(parent, args) {
            const { image, caption, username } = args;
            const handleUpload = () => {
                const uploadTask = storage.ref(`images/${image?.name}`).put(image);
                uploadTask.on(
                    "state_changes",
                    
                    () => {
                        storage.ref("images").child(image?.name).getDownloadURL()
                            .then(url => {
                                //post image in db
                                db.collection("posts").add({
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    caption: caption,
                                    imageUrl: url,
                                    username: username
                                })
                                
                            })
                    }
                )
            }
            handleUpload();
        },

        uploadComment(parent,args){
            const{text,username,postId}=args;
            db.collection("posts").doc(postId).collection("comments").add({
                text:text,
                username:username,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
            })
            return text;
        }
    }
};


module.exports = { resolvers };



