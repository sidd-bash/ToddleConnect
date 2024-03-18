import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Chats from '../Chats/Chats'
import ChatBox from '../ChatBox/ChatBox'
import { ChatProvider } from '../../context/chatContext';
import NavBar from "../NavBar/NavBar";
import './Main.css';
import { WindowProvider } from '../../context/windowContext';
export default function Main() {
  return (
    <ChatProvider>
      <WindowProvider>
      <div className='d-flex'>
        <div className='d-none d-sm-block'>

        <NavBar />
        </div>
      <div className='d-flex flex-column'>
          
          <SearchBar id="searchBar"/>
        
          <div className='d-flex'>
          <Chats/>
          <ChatBox/>
          </div>
        
      </div>
      </div>
      </WindowProvider>
    </ChatProvider>
  )
}
