import React,{useState,useEffect,useContext} from 'react'
import "./SearchBar.css";
import { Search } from 'react-bootstrap-icons'
import axios from 'axios';
import { ChatContext } from '../../context/chatContext';
import { AuthContext } from '../../context/authContext';
import NavBar from '../NavBar/NavBar';
import { WindowContext } from '../../context/windowContext';
export default function SearchBar() {
  const {contacts, setContacts, setSelectedContact,setUsers} =useContext(ChatContext)
  const [search, setSearch] = useState('')
  const [results,setResults] = useState([])
  const [isActive,setIsActive] = useState(false)
  const {authToken} = useContext(AuthContext)
  const [isSelecting, setIsSelecting] = useState(false)
  const {windowState,setWindowState} = useContext(WindowContext)
  const handleFocus = ()=>{
    setIsActive(true)
  }
  const handleBlur = () => {
    if (!isSelecting) {
       setIsActive(false);
    }
    setIsSelecting(false);
   };
  
  useEffect(()=>{
    axios.post(`https://toddle-connect.vercel.app/graphql`,
    {
      "query": `{ users(keyword: "${search}") { id first_name last_name email post image } }`
    },
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(
      response=>{
        console.log(response.data.data.users)
        setResults(response.data.data.users)
        setUsers(response.data.data.users)
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search,authToken])
  const handleContactSelect = (result) => {
    setIsSelecting(true);
    setSelectedContact(result.id);
    setWindowState(true)
    if (!contacts.some(contact => contact.id === result.id)) setContacts([...contacts, result]);
    setIsActive(false);
   };
   
  return (
    <div className={`d-flex justify-content-center SearchBar align-items-center col-12 ${windowState ? 'd-none' : ''}`}>
      <div id='navBarTwo' >

      <NavBar/>
      </div>
      <div className='d-flex align-items-center border border-disabled rounded w-50 bg-white p-1 Input'>
        <Search/>
        <input style={{ outline: 'none' }} type="text" placeholder='Search' value={search} onChange={e=>setSearch(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}/>
        <div className='d-flex flex-column rounded mt-5 w-100 bg-light align-items-start' style={{position:'absolute', top:'1vh'}}>
        {isActive && results.map(result=>(
          <button key={result.id} className='bg-white border border-disabled col-5 justify-content-start d-flex' onMouseDown={() => setIsSelecting(true)} onClick={() => handleContactSelect(result)}>
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
