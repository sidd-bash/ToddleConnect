import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './authContext';
const ChatContext = createContext({
  selectedContact: null,
  setSelectedContact: () => { },
  contacts: [], // Initial contacts as an empty array
  setContacts: () => { },
  isLoading: false,
  error: null,
  users: [],
  setUsers: () => { }
});


const ChatProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [users, setUsers] = useState([])


  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      setError(null);

      try {
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
  }, [currentUser.id]);

  const handleContactSelect = (contactId) => setSelectedContact(contactId);
  const handleUsers = (users) => setUsers(users)
  const handleContacts = (contacts) => setContacts(contacts)
  return (
    <ChatContext.Provider
      value={{
        selectedContact,
        setSelectedContact: handleContactSelect,
        contacts,
        setContacts: handleContacts,
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