import React,{useState,useContext,useEffect, useMemo,useCallback} from 'react'
import "./InputBox.css"
import { MdTextFields } from "react-icons/md";
import { BsEmojiLaughing} from "react-icons/bs";
import { Plus } from 'react-bootstrap-icons'
import { IoMicOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import axios from 'axios';
import { ChatContext } from '../../context/chatContext';
import { AuthContext } from '../../context/authContext';
import { io } from "socket.io-client";
import {GoogleGenerativeAI} from "@google/generative-ai";
import AIMenu from '../AIMenu/AIMenu';

export default function InputBox({user, messages, setMessages}) {
    const [newMsg, setNewMsg] = useState('');
    const {currentUser,authToken} = useContext(AuthContext)
    const {selectedContact} = useContext(ChatContext);
    const socket = useMemo(()=>io("https://toddle-connect.vercel.app"),[])
    const [argument,setArgument] = useState(0)
    const [showMenu,setShowMenu] = useState(false)
    const [language,setLanguage] = useState('English')
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
    const run = useCallback(async (argument) => {
      // Function body remains the same
      const genAI = new GoogleGenerativeAI('AIzaSyCBN4uDI9VAUVDIQvHD3DOC6qL-Yp7xpPA');
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      let prompt;
      if(argument === 1) prompt = "Shorten this message: "+newMsg
      else if(argument === 2) prompt = "Elaborate this message: "+newMsg
      else if(argument === 3) prompt = "Fix spelling and grammar in this message: "+newMsg
      else if(argument === 4) prompt = "Translate this message to " + language + ": "+newMsg
    
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setNewMsg(text)
      setArgument(0)
     }, [newMsg, language]);


    useEffect(()=>{
      console.log(argument)
      if(argument!==0){
        run(argument)
      }
    },[argument,run])
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(newMsg,user)
            axios.post('https://toddle-connect.vercel.app/graphql',{
              "query": `mutation($sender_id: ID!, $receiver_id: ID!, $content: String!) {createMessage(sender_id: $sender_id, receiver_id: $receiver_id, content: $content) {sender_id receiver_id content timestamp}}`,
              "variables":{
                "sender_id": currentUser.id,
                "receiver_id": selectedContact,
                "content": newMsg
              },
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
          )
            .then(response => {
              const message = response.data.data.createMessage;
              let gmtTimestamp = Number(message.timestamp);

          // Convert the GMT timestamp to milliseconds (JavaScript Date works with milliseconds)
          const gmtDate = new Date(gmtTimestamp * 1000);

          // Convert the GMT date to IST
          // IST is 5 hours and 30 minutes ahead of GMT
          const istDate = new Date(gmtDate.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));

          // Format the IST date as needed
          const istDateString = istDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

          console.log('tIME IN IST:', istDateString);

          const date = new Date(gmtDate.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));
              const year = date.getFullYear();
              const month = date.getMonth() + 1; // Months are zero-based, so we add 1
              const day = date.getDate();
              const hours = date.getHours();
              const minutes = date.getMinutes();
              message.time = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
              message.date = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
              setMessages([...messages,message])
              socket.emit('message',message)
              setNewMsg('')

            })
            .catch(error => {
              console.error('Error:', error.message);
            });
    }
  return (
    <div className='p-2'>
      {showMenu && <AIMenu setArgument={setArgument} setLanguage={setLanguage}/>}
      <div id='inputBox' className='p-2 rounded'>
        <form onSubmit={handleSubmit}>

            <input style={{ outline: 'none' }} className="w-100" type="text" value={newMsg} onChange={e=>setNewMsg(e.target.value)} name="" placeholder='Type Cmd + J to write with AI or type your message here' id="" />
        <div id='buttons' className='mt-1'>
            <div className='d-flex align-items-center'>
            <div className='p-1 rounded btn'>

            <Plus/>
            </div>
            <div className='p-1 rounded btn'>

            <MdTextFields/>
            </div>
            <div className='p-1 rounded btn'>

            <BsEmojiLaughing/>
            </div>
            <div className='p-1 rounded btn'>@</div>
            <div className='p-1 rounded btn'>

            <IoMicOutline/>
            </div>
            </div>
            <div className='ml-auto d-flex align-items-center'>
            <div onClick={()=>{setShowMenu(!showMenu)}} id='aiButton' className='p-1 rounded btn'>
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








