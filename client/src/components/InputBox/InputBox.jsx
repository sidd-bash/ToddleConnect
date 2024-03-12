import React,{useState,useContext,useEffect, useMemo} from 'react'
import "./InputBox.css"
import { MdTextFields } from "react-icons/md";
import { BsEmojiLaughing} from "react-icons/bs";
import { Plus } from 'react-bootstrap-icons'
import { IoMicOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import axios from 'axios';
import { ChatContext } from '../../context/chatContext';
import { AuthContext } from '../../context/authContext';
// import React, { , useState } from "react";
import { io } from "socket.io-client";

export default function InputBox({user, messages, setMessages}) {
    const [newMsg, setNewMsg] = useState('');
    const {currentUser} = useContext(AuthContext)
    const {selectedContact} = useContext(ChatContext);
    const socket = useMemo(()=>io("http://localhost:3000"),[])
    
    useEffect(()=>{
      socket.on('connect',()=>{
        socket.id = currentUser.id;
        console.log('connected',socket.id);
      })
      socket.on('welcome',s=>{
        console.log(s)
      })
      socket.on('message-recieved',data=>{
        setMessages([...messages,data])

      })
    })
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(newMsg,user)
            axios.post('http://localhost:3000/api/messages/',{
                senderId:currentUser.id, 
                receiverId:selectedContact, 
                content:newMsg
            })
            .then(response => {
              console.log('Response:', response.data);
              setMessages([...messages,response.data])
              socket.emit('message',response.data)
              setNewMsg('')

            })
            .catch(error => {
              console.error('Error:', error.message);
            });
    }
  return (
    <div className='p-2'>
      <div id='inputBox' className='p-2 rounded'>
        <form onSubmit={handleSubmit}>

            <input className="w-100" type="text" value={newMsg} onChange={e=>setNewMsg(e.target.value)} name="" placeholder='Type Cmd + J to write with AI or type your message here' id="" />
        <div id='buttons'>
            <div className='d-flex align-items-center'>

            <Plus/>
            <MdTextFields/>
            <BsEmojiLaughing/>
            <div>@</div>
            <IoMicOutline/>
            </div>
            <div className='ml-auto d-flex align-items-center'>
            <div>
                AI
            </div>
            
            <button style={{ border: "none", background: "none" }} type='submit'><VscSend/></button>
        </div>
            </div>
        </form>

      </div>
    </div>
  )
}






