import React,{useEffect,useState} from 'react'
import Recieve from './MassageRecieve'
import Send from './MessageSend'
import ChatForm from './ChatForm'
import {socket} from'../../../config/Socket'
export default function ChatRoom() {
    const [chatroom,setChatroom]=useState({
        activeUsers:[],
        message:"",
        userMessages:[]
    })
   
    socket.on("chat:server",chat=>{
        //alert.show(`${chat.user} send you a message!`,'info')
        console.log("Im hit")
        const messageObject={
            user:chat.user,
            message:chat.message,
            fromMe:false
        }
        let Messages = [...chatroom.userMessages];
        Messages.push(messageObject)
        setChatroom({...chatroom,userMessages:Messages})
    })
     

    useEffect(()=>{
        console.log("Im hit")
        socket.on('getActiveUsers',activeUsers=>{
                console.log(activeUsers)
                setChatroom({...chatroom,activeUsers:activeUsers})
            })

            socket.emit('setOnlineUser',window.localStorage.getItem('userName'));
   
    },[])
    const handleChange=(e)=>{
        const value = e.target.value;
        setChatroom({...chatroom,[e.target.name]:value})
    }
    const handleSend=()=>{
        const userName = window.localStorage.getItem('userName')
        const messageObject={
            user:userName,
            message:chatroom.message,
            fromMe:true
        }
        socket.emit('chat:client',{message:chatroom.message,user:userName});
        let Messages = [...chatroom.userMessages];
        Messages.push(messageObject)
        setChatroom({...chatroom,userMessages:Messages})
    }
    return (
        <div className="container">
            <div className="chatroom-container mx-auto">
                {
                chatroom.userMessages.map((message)=>{
                   return message.fromMe?
                   <Send key={message.username} message={message}/>:
                   <Recieve key={message.username} message={message}/>;
                }
                )
                }
            </div>
            <ChatForm 
            handleChange={handleChange}
            handleSend={handleSend}/>
        </div>
    )
}
