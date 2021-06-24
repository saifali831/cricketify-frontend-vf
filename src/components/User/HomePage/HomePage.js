import React,{useState,useEffect} from 'react'
import {SearchForm,PostInfo} from '../../Common';
import { useAlert } from 'react-alert'
import axios from 'axios'
export default function HomePage() {
    const alert = useAlert()

    const [post,setPost]=useState({
        data:[]
    })
    const [search,setSearch]=useState({
        query:"",
        selectedOption:"all"
    })
    const handleSearch=(e)=>{
        const value=e.target.value;
        setSearch({...search,[e.target.name]:value})
    }
    const loadData=()=>{
        axios
        .get(`https://cricketify-backend.herokuapp.com/api/post/get`)
        .then(result=>{
            setPost({data:result.data})
            console.log(result.data);
        })
        .catch(error=>{
            console.log(error);
        })
    }
    useEffect(()=>{
       loadData();
    },[])

    const getSearch=()=>{
        axios
        .get(`https://cricketify-backend.herokuapp.com/api/post/search?query=${search.query}&filter=${search.selectedOption}`)
        .then(result=>{
            setPost({data:result.data})
        })
        .catch(error =>{
            console.log(error);
        })   
    }
    
    const postComment=(text,postId)=>{
        const userName = window.localStorage.getItem("userName");
        axios
        .post("https://cricketify-backend.herokuapp.com/api/post/comment/create",{postId,text,userName})
        .then((result)=>{
            alert.show(result.data.message,{type:"success"})
            loadData()
        })
        .catch((err)=>{
            alert.show(err.response.data.message,{type:"error"})
        })
    }

    const handleRadioChange=(e)=>{
        const value = e.target.value;
        setSearch({...search,selectedOption:value})
    }
    return (
        <React.Fragment>
            <div className="hero-bg">
                <div className="overlay"></div>
            <div className="hero-content">
            <h1 className="hero-heading">Welcome to cricketing world</h1>
            <p className="hero-text">Share, Connect and enjoy!</p>
            </div>
        </div>
        <div className="container">
        <SearchForm
            search={search} 
            handleSearch={handleSearch}
            getSearch={getSearch}
            handleRadioChange={handleRadioChange}/>
    
        <h1 className="main-heading">All Posts</h1> 
        {
            post.data.map((post)=><PostInfo 
            key={post._id} 
            post={post}
            postComment={postComment}/>)
        }
        
        </div>
        </React.Fragment>
    )
}
