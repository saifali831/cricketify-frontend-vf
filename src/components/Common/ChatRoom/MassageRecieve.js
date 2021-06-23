import React from 'react'

export default function MassageRecieve(props) {
    const {message} = props;

    return (
        <div className="message right">
            <span className="user">{message.user}</span>
            <span className="text reciever">{message.message}</span>
        </div>
    )
}
