import React from 'react'
import "./NavBar.css"
import {ChatSquareTextFill,Hash,Eye, PieChart, Gear} from 'react-bootstrap-icons';
// import Hash from 'react-bootstrap-icons';

import { RiFlag2Line } from "react-icons/ri";
export default function NavBar() {
  return (
    <nav className='d-flex flex-column pt-5 bg-light'>
      <div>
        <ChatSquareTextFill/>
        Chats
      </div>
      <div>
        <Hash/>
        Channels
      </div>
      <div>
        <RiFlag2Line />
        Flagged
      </div>
      <div>
        <Eye/>
        Overview
      </div>
      <div>
        <PieChart/>
        Analytics
      </div>
      <div>
        <Gear/>
        Settings
      </div>
    </nav>
  )
}
