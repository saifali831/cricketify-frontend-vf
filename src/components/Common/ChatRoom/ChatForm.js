import React from 'react'

export default function ChatForm(props) {
    const {handleChange,handleSend} = props
    return (
        <div className="chat-form-container">
            <input 
            type="text" 
            name="message"
            placeholder="type message.."
            onChange={handleChange}
            />
            <button onClick={handleSend}>send</button>
        </div>
    )
}
