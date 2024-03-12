import React,{useState,useEffect,useContext} from 'react'
import "./SearchBar.css";
import { Search } from 'react-bootstrap-icons'
import axios from 'axios';
import { ChatContext } from '../../context/chatContext';
export default function SearchBar() {
  const {selectedContact,setSelectedContact,setUsers} =useContext(ChatContext)
  const [search, setSearch] = useState('')
  const [results,setResults] = useState([])
  const [isActive,setIsActive] = useState(false)
  const handleFocus = ()=>{
    setIsActive(true)
  }
  useEffect(()=>{
    axios.get(`http://localhost:3000/api/users/search/${search}`)
    .then(
      response=>{
        console.log(response.data)
        setResults(response.data)
        setUsers(response.data)
      }
    )
  },[search])
  useEffect(()=>{ 
    console.log('Selected Contact',selectedContact)
  },[selectedContact])
  const handleContactSelect = (result)=>{
    //  console.log(result)
    setSelectedContact(result.id)
    setIsActive(false)
  }
  return (
    <div className='d-flex justify-content-center SearchBar align-items-center'>
      <div className='d-flex align-items-center border border-disabled rounded w-50 bg-white p-1 Input'>
        <Search/>
        <input type="text" placeholder='Search' value={search} onChange={e=>setSearch(e.target.value)} onFocus={handleFocus} onBlur={handleFocus}/>
        <div className='d-flex flex-column rounded mt-5 w-100 bg-light align-items-start' style={{position:'absolute', top:'1vh'}}>
        {isActive && results.map(result=>(
          <button key={result.id} className='bg-white border border-disabled col-5 justify-content-start d-flex' onClick={()=>handleContactSelect(result)}>
            <div className='p-2 d-flex flex-column align-items-start'>
              <div>{result.first_name + " " + result.last_name}</div>
              <div className='text-secondary'>{result.post}</div>
            </div>
          </button>
          
        )
        )}
        </div>
        
      </div>
    </div>
  )
}
