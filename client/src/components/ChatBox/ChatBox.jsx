import React, { useState, useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../../context/chatContext';
import "./ChatBox.css";
import InputBox from '../InputBox/InputBox';
import Message from '../Message/Message';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import toddleWallpaper from "../../images/toddleWallpaper.png"
import { FiArrowLeftCircle } from 'react-icons/fi';
import { WindowContext } from '../../context/windowContext';

export default function ChatBox() {
  const { currentUser, authToken } = useContext(AuthContext)
  const { selectedContact, contacts } = useContext(ChatContext);
  const [isLoading, setIsLoading] = useState(); 
  const [error, setError] = useState()
  const chatBoxRef = useRef(null);
  const [isChatBoxVisible, setIsChatBoxVisible] = useState(false); // State to control chatbox visibility
  const {windowState,setWindowState} = useContext(WindowContext)
  const selectedContactDetails = contacts.find(
     (contact) => contact.id === selectedContact
  );
  useEffect(()=>{
    if(windowState) setIsChatBoxVisible(true);
  },[windowState])
  const [messages, setMessages] = useState([]);
 
  const handleChatNav = () => {
     setIsChatBoxVisible(!isChatBoxVisible); // Toggle chatbox visibility
     setWindowState(false)
  };
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(`https://toddle-connect.vercel.app/graphql`,
          {
            "query": `{ messages (user1Id: ${currentUser.id},user2Id: ${selectedContact} ) { id sender_id receiver_id content timestamp } }`
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );
        let data = response.data.data.messages;
        console.log('here are the messages', data)
        data = data.map(message => {
          // Your timestamp
          let gmtTimestamp = Number(message.timestamp);

          // Convert the GMT timestamp to milliseconds (JavaScript Date works with milliseconds)
          const gmtDate = new Date(gmtTimestamp * 1000);

          // Convert the GMT date to IST
          // IST is 5 hours and 30 minutes ahead of GMT
          const istDate = new Date(gmtDate.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));

          // Format the IST date as needed
          const istDateString = istDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

          console.log('tIME IN IST:', istDateString);

          const date = new Date(gmtDate.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));

          // Extracting date components
          const year = date.getFullYear();
          const month = date.getMonth() + 1; // Months are zero-based, so we add 1
          const day = date.getDate();
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
          const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
          message.time = formattedTime;
          message.date = formattedDate;
          return message
        })
        setMessages(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (selectedContact) fetchMessages();
  }, [selectedContact, currentUser.id,authToken])

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages])
  return (
    <div id="chatBox" className={`d-flex flex-column justify-content-start ${isChatBoxVisible ? 'show' : ''}`}>
      {selectedContactDetails ? (
        <>
          <div id="chatBoxTab" class="d-flex align-items-center p-1 border border-disabled">
            <div id="image" className="rounded border border-disabled">
              <img src={selectedContactDetails.image} alt="" width={50} />
            </div>
            <h3 className='fw-bold mx-2 align-self-end'>{selectedContactDetails.first_name + " " + selectedContactDetails.last_name}</h3>
          </div>
          <FiArrowLeftCircle className='fs-3 d-lg-none' id='backButton' onClick={handleChatNav}/>
          <div id='chatBoxMessages' ref={chatBoxRef}>
            {!isLoading && !error && messages.map((message) => (
              <Message message={message} key={message.id} details={selectedContactDetails} userDetails={currentUser} />
            ))}
          </div>

          <div id="input" className='mt-auto'>
            <InputBox user={currentUser} setMessages={setMessages} messages={messages} />
          </div>
        </>
      ) : <div >
        <img src={toddleWallpaper} alt="" style={{ position: "fixed", top: "40%", left: "55%" }} width={500} />
      </div>}
    </div>
  );


}
