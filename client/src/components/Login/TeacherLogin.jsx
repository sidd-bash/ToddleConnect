import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import logo from "../../images/toddleLogo.png"
import logoWhite from "../../images/toddleLogoWhite.jpg"

import landing from "../../images/teacherLogin.png"

import { IoArrowBackCircleOutline } from "react-icons/io5";
import googleLogo from "../../images/googleLogo.jpeg";
import microsoftLogo from "../../images/microsoftLogo.png";
import cleverLogo from "../../images/cleverLogo.png";
import {Row} from "react-bootstrap"
// import { ChatContext } from '../../context/chatContext'
import axios from 'axios';
import { AuthContext } from '../../context/authContext'
// import './Landing.css'
export default function TeacherLogin() {
    const navigate = useNavigate();
    const {currentUser,setCurrentUser,setAuthToken} = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [user,setUser] = useState(null);
    const handleSubmit = (e) =>{
      e.preventDefault();
      axios.post('http://localhost:8000/graphql',{
        "query": `mutation($email: String!, $password: String!) {login(email: $email, password: $password) {user {id first_name last_name email post image}, authToken }}`,
        "variables":{
          "email": email,
          "password": password,
        }})
        .then(response => {
            setAuthToken(response.data.data.login.authToken)
            setCurrentUser(response.data.data.login.user)
            navigate('/main');
          }) 
          .catch(error => {
            console.error('Error:', error.message);
          });
    }
    useEffect(()=>{
      console.log("current user changed: ",currentUser)
    })
  return (
    
    <div className='d-flex justify-content-center col-12'>
        <img src={logoWhite} alt="" width={170} className='m-5 d-sm-none d-xs-none d-md-none d-lg-block' style={{position:"absolute", left:"10px"}}/>
    <div className='col-lg-6 d-xs-none d-sm-none d-md-none d-lg-block'>
        <img src={landing} alt="" style={{height:"100vh"}}/>
    </div>
    
    <div className='d-flex flex-column col-lg-6 col-12 justify-content-center'>
      <div className='mt-3 pt-5'>

      
      <img src={logo} alt="" width={150} className='m-5 d-lg-none' />
      <button className='text-secondary mx-1 d-flex align-items-center' onClick={()=>{navigate('/')}} style={{background:"none",border:"none",}}><IoArrowBackCircleOutline/>
      <div className='mx-1'>Toddle home</div></button>
      <h2 className='fw-bold mx-1'>Teacher account</h2>
      <p>Sign in using</p>
      <div className='d-grid gap-3 text-secondary'>
        <Row>

        
        <button className='p-2 border border-disabled rounded w-25 d-flex align-items-center justify-content-center m-3' style={{background:"none"}}>
            <img src={googleLogo} alt="" width={30} />
            <div className='mx-2'>
                Google
            </div>
        </button>
        <button className='p-1 border border-disabled rounded w-25 d-flex align-items-center justify-content-center m-3' style={{background:"none"}}>

            <img src={microsoftLogo} alt="" width={50} />
            <div>
                Microsoft
            </div>
        </button>
        </Row>
        <Row>
        <button className='p-1 border border-disabled rounded w-25 d-flex align-items-center justify-content-center m-3' style={{background:"none"}}>

            <img src={cleverLogo} alt="" width={40} />
            <div>
                Clever
            </div>
        </button>
        <button className='p-1 border border-disabled rounded w-25 d-flex align-items-center justify-content-center m-3' style={{background:"none"}}>

            <img src={microsoftLogo} alt="" width={50} />
            <div>
                Microsoft
            </div>
        </button>
        </Row>
      </div>
      <div className='m-4 mx-2 d-flex align-items-center'>
        <hr className="solid col-3 text-secondary mx-2"/>
        <div className='text-secondary'>or</div>
        <hr className="solid col-3 text-secondary mx-2"/>
      </div>
      <form onSubmit={handleSubmit} className='d-flex flex-column gap-2'>
        <p className='fw-bold'>Sign in with email</p>
        <input type="text" placeholder='Enter your email id' className='flex items-center empty:ml-0 text-label-2 text-textSubtle group-hover/btn:text-textDefault ml-2 border border-disabled p-2 rounded col-6' name='email' autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="text" placeholder='Password' className='flex items-center empty:ml-0 text-label-2 text-textSubtle group-hover/btn:text-textDefault ml-2 border border-disabled p-2 rounded col-6' name='password' autoComplete='off' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit' className='mx-2 col-2 rounded border border-none text-secondary fw-bold p-2'>Next</button>
      </form>
      <small>Don't have an account? <a href="/teacherRegister" style={{textDecoration:"none"}}>Create new</a></small>
        </div>
    </div>
    </div>
  )
}
