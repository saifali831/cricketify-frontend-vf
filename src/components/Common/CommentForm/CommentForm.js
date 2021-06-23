import React,{useState} from 'react'

export default function CommentForm(props) {
    const [comment,setComment]=useState({
        text:""
    })

    const handleComment=(e)=>{
        const value = e.target.value;
        setComment({
            ...comment,
            [e.target.name]:value})
    }
    return (
        <div className="comment-form-container">
            <input 
            type="text" 
            name="text" 
            placeholder="add comment"
            value={comment.text}
            onChange={handleComment} />
            <button onClick={()=>{props.postComment(comment.text,props.postId)}}>comment</button>
        </div>

    )
}
