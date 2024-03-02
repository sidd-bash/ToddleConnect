import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
function App() {
  return (
    <div className="App d-flex">
      <NavBar/>
      <Main/>
    </div>
  );
}

export default App;
// import "./App.css";
// import React, { useEffect, useMemo, useState } from "react";
// import { io } from "socket.io-client";
// import users from "./users"
// const App = () => {
//   const realSender = null;
//   const socket = useMemo(()=>io("http://localhost:3000"),[])
//   const [message,setMessage]  = useState();
//   const [recievedMessage,setRecievedMessage] = useState({
//     text:"",
//     reciever:""
//   });

//   const [reciever,setReciever] = useState();
//   useEffect(()=>{
//     socket.on('connect',()=>{
//       socket.id = realSender.id;
//       console.log('connected',socket.id);
//     })
//     socket.on('welcome',s=>{
//       console.log(s)
//     })
//     socket.on('message-recieved',data=>{
//       setRecievedMessage(data);
//     })
//   })




//   const handleSend = e=>{
//     e.preventDefault();
//     socket.emit('message',{text:message,sender:socket.id,reciever:reciever})
//     setMessage('')
//   }
//   return <div>
//     <form onSubmit={handleSend}>
//       <div className="contacts" style={{display:"flex"}}>
//         {users.map((user)=>{
//           if(user.id!=realSender.id){
//             return(<div onClick={()=>setReciever(user.id)}>{user.name}</div>)          
//           }
//         }
//         ) 
//       }
//       </div>
//       <h1>{recievedMessage.text} by {recievedMessage.sender} to {recievedMessage.reciever}</h1>
//       <input type="text" name="message" value={message} onChange={e=>setMessage(e.target.value)}/>
//       <button type="submit">Send</button>
//     </form>
//   </div>
// };

// export default App;