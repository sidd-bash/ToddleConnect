import React from 'react'
import "./Contact.css"
export default function Contact({ contact }) {
    return (
        <div id="contact" className='d-flex px-4 p-2'>
            <div id="image" className='rounded border border-disabled'>
            <img src={contact.image} alt="" width={50} />
            </div>
            <div className='d-flex flex-column mx-2'>
                {contact.first_name + " " + contact.last_name}
                {contact.post && <small className='text-secondary'>{contact.post}</small>}
            </div>
        </div>

    )
}
