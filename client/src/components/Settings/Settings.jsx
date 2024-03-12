import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import { AuthContext } from '../../context/authContext';
import './Settings.css';
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
export default function Settings() {
  const {currentUser,setCurrentUser} = useContext(AuthContext)
  const [firstName,setFirstName] = useState(currentUser.firstName)
  const [lastName,setLastName] = useState(currentUser.lastName)
  const [image,setImage] = useState(currentUser.image)
  const [imageValue,setImageValue] = useState(null);
  const navigate = useNavigate();
  const handleImageChange =()=>{
    

    console.log(imageValue)
    const data = new FormData()
    data.append('file',imageValue)
    data.append('upload_preset','siddharth')
    data.append('cloud_name','toddleconnect')
    axios.post('https://api.cloudinary.com/v1_1/toddleconnect/image/upload',data)
    .then(res=>{
      console.log('this is here the result from cloudinary',res.data.secure_url)
      setImage(res.data.secure_url)
    })
    .catch(err=>console.log(err))
  }
  const handleSubmit = e=>{
      e.preventDefault();
      axios.put(`http://localhost:3000/api/users/${currentUser.id}`,{

        firstName,
        lastName,
        image
      })
      .then(res=>console.log(res))
      .then(setCurrentUser({...currentUser,firstName,lastName,image}))
      .catch(err=>console.log('server error:',err))
  }
  useEffect(handleImageChange,[imageValue])
  return (
    
    <div className=' d-flex align-items-center justify-content-center col-12'>

<form onSubmit={handleSubmit} className='d-flex gap-4 mt-5 flex-column align-items-center rounded col-6 border border-disabled bg-light p-3'>
  <FiArrowLeftCircle className='fs-3' id='backButton' onClick={()=>navigate('/main')}/>
  <label htmlFor="profile-picture" className="edit-photo">
    <img src={image} className="edit-photo-image rounded-circle profile-picture" alt="Profile" width={150} />
    <span className="edit-photo-text">Edit Photo</span>
  </label>
  <input type="file" id="profile-picture" accept="image/*" onChange={e => setImageValue(e.target.files[0])} style={{ display: 'none' }} />
  <input  className='p-2 col-6 rounded' value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='first name' />
  <input  className='p-2 col-6 rounded' value={lastName} onChange={e => setLastName(e.target.value)} placeholder='last name' />
  <Button className="button btn-danger col-3" type='submit'>Apply Changes</Button>
</form>

    </div>
    
  )
}
