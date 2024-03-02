import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Contact from '../Contact/Contact'
import { Filter,Search } from 'react-bootstrap-icons'
import { Plus } from 'react-bootstrap-icons'
import data from "../../data.js"
import "./Chats.css"
export default function Chats() {
  return (
    <div className='col-4 border border-black'>
        <div id="ChatsTab" className='d-flex align-items-center justify-content-between'>
            <h2 className="justify-self-left">Chats</h2>
            <div id="filter">
              <Filter/>
            </div>
            <div id="add">
              <Plus/>
            </div>
        </div>
        <div className='d-flex align-items-center border border-disabled rounded w-50 bg-white p-1 Input'>
        <Search/>
        <input type="text" placeholder='Search' />
      </div>
      <div className='d-flex flex-column'>
      {data.map(person=>{
        return(
            <Contact person={person}/>
        )
      })}

      </div>

    </div>
  )
}
