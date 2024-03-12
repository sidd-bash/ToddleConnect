import React from 'react'
import "./NavBar.css"
import {ChatSquareTextFill,Hash,Eye, PieChart, Gear} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { RiFlag2Line } from "react-icons/ri";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className='d-flex flex-column pt-5 bg-light'>
      <div>
        <ChatSquareTextFill/>
        Chats
      </div>
      <div className='text-secondary'>
        <Hash className='fs-4'/>
        <small>Channels</small>
      </div>
      <div className='text-secondary'>
        <RiFlag2Line />
        <small>Flagged</small>
      </div>
      <div className='text-secondary'>
        <Eye/>
        <small>Overview</small>
      </div>
      <div className='text-secondary'>
        <PieChart/>
        <small>Analytics</small>
        
      </div>
      <button className='text-secondary bg-light pt-3 pb-3 d-flex flex-column align-items-center border border-none'onClick={()=>navigate('/settings')}>
        <Gear/>
        <small>Settings</small>
      </button>
    </nav>
  )
}
