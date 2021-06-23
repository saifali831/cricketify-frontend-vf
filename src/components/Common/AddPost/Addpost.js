import React,{useEffect,useState} from 'react';
import {useAlert} from 'react-alert';
import axios from 'axios';
export default function Addpost() {
const alert = useAlert();
const [post,setPost]=useState({
    postTitle:"",
    postText:"",
    postImage:null
})

const handlePost=(e)=>{
    const value=e.target.value;

    setPost({
        ...post,
        [e.target.name]:value})
}
const addPost=()=>{
    const {postText,postTitle,postImage} = post;
    const userId = window.localStorage.getItem('userId');
    const imageData = new FormData();
    imageData.append('postImage',postImage);
    const postObject = {userId,postText,postTitle,imageData};
    
    if(!postText||!postTitle){
        alert.show('Post title or text is empty!',{type:"error"})
    }
    else{
        axios.post('https://cricketify-backend.herokuapp.com/api/post/create',
        postObject)
        .then(result=>{
                alert.show(result.data.message,{type:"success"})
                window.location.replace('/timeline')
        })
        .catch(err=>{
            alert.show(err.response.data.message,{type:"error"})
        })
    }
}

const handleFile=(e)=>{
    console.log("Im hit");
    const file = e.target.files[0];
    setPost({...post,postImage:file})
}

    return (
        <div className="post-form-container">
            <input 
            name="postTitle"
            type="text" 
            placeholder="Title"
            className="post-form-group"
            value={post.postTitle}
            onChange={handlePost}
            />
            <textarea 
            name="postText" 
            rows="5"
            className="post-form-group"
            value={post.text}
            onChange={handlePost}
            placeholder="Share your knowledge of cricket.."></textarea>
            {/* <div class="form-group files mb-3">
                <label>Upload Image </label>
                <input 
                type="file" 
                class="form-control" 
                multiple="" 
                onChange={handleFile}/>
            </div> */}
            <button onClick={addPost}>Post</button>
        </div>
    )
}
