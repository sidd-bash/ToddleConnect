import React, { useContext } from 'react';
import Contact from '../Contact/Contact';
import { Filter, Search } from 'react-bootstrap-icons';
import { Plus } from 'react-bootstrap-icons';
import "./Chats.css";
import { ChatContext } from '../../context/chatContext.jsx';
import { AuthContext } from '../../context/authContext.jsx';
import { WindowContext } from '../../context/windowContext.jsx';

export default function Chats() {
  const { currentUser } = useContext(AuthContext)
  const { contacts, isLoading, error, setSelectedContact } = useContext(ChatContext);
  const {windowState,setWindowState} = useContext(WindowContext);
  const handleContactSelect = (id)=>{
    setSelectedContact(id)
    
    setWindowState(true)
    console.log(windowState)
  }
  return (
    <>
    
    {!windowState && <div id="chats" className='border border-disabled col-12'>
      <div id="ChatsTab" className="d-flex justify-content-end align-items-center p-4">
        <h3 className='justify-self-start mr-auto fw-bold align-self-center pt-2'>Chats</h3>
        <div id="filter" className="mx-2 border border-disabled">
          <Filter />
        </div>
        <div id="add" className="">
          <Plus />
        </div>
      </div>

      <div className='d-flex align-items-center border border-disabled rounded bg-white mx-4 p-1 Input m-2'>
        <Search />
        <input type="text" placeholder='Find a chat' />
      </div>
      <div className='d-flex flex-column mt-2'>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {contacts && contacts.length > 0 ? contacts.map((contact, index) => (
          <button style={{ border: "none", background: "none" }} onClick={()=>handleContactSelect(contact.id)} key={contact.id}>
            {contact.id !== currentUser.id && <Contact contact={contact} />}
          </button>
        )) : <p>No contacts found.</p>}
      </div>
    </div>}
    </>
  );
}
