import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Chats from '../Chats/Chats'
import ChatBox from '../ChatBox/ChatBox'
import { ChatProvider } from '../../context/chatContext';
import NavBar from "../NavBar/NavBar";
export default function Main() {
  return (
    <ChatProvider>
      <div className='d-flex'>
        <NavBar/>
      <div className='d-flex flex-column'>
        <SearchBar/>
        
          <div className='d-flex'>
          <Chats/>
          <ChatBox/>
          </div>
        
      </div>
      </div>
    </ChatProvider>
  )
}
