import React,{useState,useContext, useEffect} from 'react'
import { ChatContext } from '../../context/chatContext';
import person from "../../images/avatar.jpeg";
import "./ChatBox.css";
import InputBox from '../InputBox/InputBox';
import Message from '../Message/Message';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
export default function ChatBox() {
  const {currentUser} = useContext(AuthContext)
  const { selectedContact, users} = useContext(ChatContext);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState()

  const selectedContactDetails = users.find(
    (contact) => contact.id === selectedContact
  );
  // const [user,setUser] = useState(JSON.parse(window.localStorage.getItem('currentUser')));
  // setCurrentUser(user)
  // useEffect(()=>{
  //   if(currentUser){

  //     setUser(users.find(
  //       (contact) => contact.id === currentUser.id
  //       ))
  //   }
  // },[currentUser])
  useEffect(()=>{
    console.log(selectedContactDetails,users,selectedContact)
  })
  const [messages,setMessages] = useState([])
  useEffect(()=>{
    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);
      console.log(currentUser,selectedContact)
      try {
        const response = await axios.get(`http://localhost:3000/api/messages/${currentUser.id}/${selectedContact}`);
        console.log(response.data);
        const data = response.data;
        data.map(message=>{
          
          
          const dateTime = new Date(message.timestamp);
          
          // Extracting Date
          const year = dateTime.getFullYear();
          const month = dateTime.getMonth() + 1; // Month is zero-indexed, so we add 1
          const day = dateTime.getDate();
          
          // Extracting Time
          const hours = dateTime.getHours();
          const minutes = dateTime.getMinutes();
          const seconds = dateTime.getSeconds();
          message.time = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
          message.date = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
          console.log(message.time,message.date)
        })          
        setMessages(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if(selectedContact && currentUser && currentUser.id != undefined) fetchMessages();
  },[selectedContact])
  return (
    <div id="chatBox" className="d-flex flex-column justify-content-start">
      {selectedContactDetails ? ( // Conditional rendering based on selectedContactDetails
        <>
          <div id="chatBoxTab" class="d-flex align-items-center p-1 border border-disabled">
            <div id="image" className="rounded border border-disabled">
              <img src={selectedContactDetails.image} alt="" width={50} />
            </div>
            <h3 className='fw-bold mx-2 align-self-end'>{selectedContactDetails.firstName + " " + selectedContactDetails.lastName}</h3>
          </div>
          <div>
            {messages.map((message) => (
              <Message message={message} key={message.id} details={selectedContactDetails} userDetails ={currentUser}/>
            ))}
          </div>
          <div id="input" className='mt-auto'>
            <InputBox user={currentUser}/>
          </div>
        </>
      ) : <div>Messages are shown here</div>}
    </div>
  );
  
  
}
