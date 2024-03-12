import React,{useContext,useEffect} from 'react'
// import { ChatContext } from '../../context/chatContext';
import { AuthContext } from '../../context/authContext';
export default function Message({message, details}) {
    const {currentUser} = useContext(AuthContext)

  return (
    <div className='bg-grey d-flex flex-column m-2' id={currentUser.id===message.sender_id ? "sent" : "recieved"}>
        <div className='d-flex' >
            <div id="image" className='rounded border border-disabled'>
                {message.sender_id === currentUser.id ? <img src={currentUser.image} alt="" width={50} /> : <img src={details.image} alt="" width={50} /> }
            </div>
            <div>

            <div className='d-flex'>

            
            <div className='m-1'>

            {message.sender_id === currentUser.id ? currentUser.firstName : details.firstName}
            </div>
            <div className='m-1'>

            <small className='text-secondary'>
                {message.time}
            </small>
            </div>
            </div>
            <div  className='m-1'>
                {message.content}
            </div>
            </div>

        </div>
        
    </div>
  )
}
