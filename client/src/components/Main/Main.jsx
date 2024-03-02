import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Chats from '../Chats/Chats'
import ChatBox from '../ChatBox/ChatBox'
export default function Main() {
  return (
    <div className='d-flex flex-column'>
      <SearchBar/>
      <Chats/>
      <ChatBox/>
    </div>
  )
}
