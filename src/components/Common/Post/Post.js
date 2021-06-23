import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {Comment} from '../Comment'
import {CommentForm} from '../CommentForm'
export default function Post(props) {
    const {_id,title,text,comments,addedBy} =  props.post;
    const [state,setState]=useState({
    isShow:false
    })
    
    const toggleComment=()=>{
        setState({isShow:!state.isShow})
    }
    return (
        <div className="row">
            <div className="col-12 col-md-8 col-lg-10 mx-auto">
        <div className="post-info-container">
            {
                props.admin?<span onClick={()=>props.handlePostDelete(_id)} className="cross-icon"><i class="fas fa-times"></i></span>
                :null
            }
            <h3>{title}</h3>
            <h6>Added by: <Link>{addedBy.firstName}</Link></h6>
            <p>{text}</p>
            <button 
            className="btn-more"
            onClick={toggleComment}
            >comments ({comments.length})</button>
        </div>
        <div className={state.isShow?"d-block":"d-none"}>
        {comments.map(comment=><Comment key={comment._id} comment={comment}/>)}
        <CommentForm key={_id} postId={_id} postComment={props.postComment}/>
        </div>
        </div>
        </div>
    )
}
