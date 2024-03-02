import React from 'react'
import "./SearchBar.css";
import { Search } from 'react-bootstrap-icons'
export default function SearchBar() {
  return (
    <div className='d-flex justify-content-center SearchBar align-items-center'>
      <div className='d-flex align-items-center border border-disabled rounded w-50 bg-white p-1 Input'>
        <Search/>
        <input type="text" placeholder='Search' />
      </div>
    </div>
  )
}
