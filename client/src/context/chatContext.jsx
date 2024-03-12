import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import {AuthContext} from './authContext';
const ChatContext = createContext({
  selectedContact: null,
  setSelectedContact: ()=>{},
  contacts: [], // Initial contacts as an empty array
  isLoading: false,
  error: null,
  users:[],
  setUsers:()=>{}
});


const ChatProvider = ({ children }) => {
  const {currentUser} = useContext(AuthContext)
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState(null);
  // const [currentUser, setCurrentUser] = useLocalStorage('currentUser',JSON.parse(window.localStorage.getItem('currentUser')))
  const [users, setUsers] = useState([])
  // useEffect(()=>{
  //   console.log('heres the global current user',currentUser)
  // },[currentUser])

 useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // console.log(currentUser)
        const response = await axios.get(`http://localhost:3000/api/users/${currentUser.id}/contacts`);
        console.log(response.data);
        const data = response.data;
        
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContacts();
 }, []);
 
  // Add functions to update state and expose them through context
  const handleContactSelect = (contactId) => setSelectedContact(contactId);
  // const handleCurrentUser = (currentUser)=>setCurrentUser(currentUser)
  const handleUsers = (users)=>setUsers(users)
  return (
    <ChatContext.Provider
      value={{
        selectedContact,
        setSelectedContact: handleContactSelect,
        contacts,
        isLoading,
        error,
        users,
        setUsers: handleUsers
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export { ChatContext, ChatProvider };