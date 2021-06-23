import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {PostInfo} from '../Common';
import {useAlert} from 'react-alert';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function ManagePosts() {
    const alert = useAlert();
    const [post,setPost]=useState({
        data:[]
    })

    useEffect(()=>{
        getUserData();
    },[])
    const getUserData=()=>{
        axios.get(`http://localhost:8080/api/post/get`)
        .then(result=>{
            setPost({data:result.data})
            console.log(post.data);
        })
        .catch(error=>{
            console.log(error);
        })
    }
    const handlePostDelete=(postId)=>{
        console.log(postId);
        confirmAlert({
            title: 'Confirm Action',
            message: 'Do you want to delete the post?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    axios.delete(`http://localhost:8080/api/post/delete/${postId}`)
                    .then((result)=>{
                        alert.show(result.data.message,{type:"success"})
                        getUserData();
                    })
                    .catch((error)=>{
                        alert.show(error.response.data.message,{type:"error"})
                    })
                }
              },
              {
                label: 'No',
                onClick: () => {
                  //Do Nothing
                }
              }
            ]
          });
          
    }
    return (
        <div className="container">
            <h1 className="main-heading">All Posts</h1>
            {
            post.data.map((post)=><PostInfo
            admin 
            handlePostDelete={handlePostDelete}
            key={post._id} 
            post={post}/>)
            }
        </div>
    )
}
