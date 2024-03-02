import React from 'react'
import "./Contact.css"
export default function Contact({ person }) {
    return (
        <div className='d-flex p-2'>
            <div id="image" className='rounded border border-disabled'>
                <img src={person.image} alt=""  width={50}/>
            </div>
            <div className='d-flex flex-column'>
                {person.name}
                <small>{person.post}</small>
            </div>
            <div className='justify-self-end'>
                {person.message[0].time}
            </div>
        </div>

    )
}
