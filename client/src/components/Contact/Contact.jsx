import React, { useEffect } from 'react'
import "./Contact.css"
export default function Contact({ contact }) {
    return (
        <div id="contact" className='d-flex px-4 p-2'>
            <div id="image" className='rounded border border-disabled'>
            <img src={contact.image} alt="" width={50} />
            </div>
            <div className='d-flex flex-column mx-2'>
                {contact.firstName + " " + contact.lastName}
                {contact.post && <small className='text-secondary'>{contact.post}</small>}
            </div>
            {/* {contact.message && contact.message.length > 0 && <small id="time" className='text-secondary'>{contact.message[0].time}</small>} */}
        </div>

    )
}
