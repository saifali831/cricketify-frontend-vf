import React from 'react'

export default function MessageSend(props) {
    const {message} = props;
    return (
        <div className="message left">
            <span className="user">{message.user}</span>
            <span className="text sender">{message.message}</span>
        </div>
    )
}
