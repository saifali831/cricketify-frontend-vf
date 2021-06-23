import React from 'react'

export default function Comment(props) {
    const {comment} = props
    return (
        <div className="comment-container">
            <h6>{comment.userName}</h6>
            <p>{comment.text}</p>
        </div>
    )
}
