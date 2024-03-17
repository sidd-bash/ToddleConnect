import React,{useState,useContext} from 'react'
import {useNavigate} from "react-router-dom"
import logo from "../../images/toddleLogo.png"
import logoWhite from "../../images/toddleLogoWhite.jpg"
import landing from "../../images/studentLogin.png"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import googleLogo3d from "../../images/googleLogo3d.jpg";
import microsoftLogo3d from "../../images/microsoftLogo3d.jpg";
import cleverLogo3d from "../../images/cleverLogo3d.jpg";
import lexLogo3d from "../../images/lexLogo3d.jpg"
import { AuthContext } from '../../context/authContext'
import axios from 'axios';
// import './Landing.css'
export default function StudentLogin() {
    const navigate = useNavigate();
    const {setCurrentUser,setAuthToken} = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('https://toddle-connect.vercel.app/graphql',{
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
  return (
    
    <div className='d-flex justify-content-center col-12'>
        <img src={logoWhite} alt="" width={170} className='m-5 d-sm-none d-xs-none d-md-none d-lg-block' style={{position:"absolute", left:"10px"}}/>
    <div className='col-lg-6 d-xs-none d-sm-none d-md-none d-lg-block'>
        <img src={landing} alt="" style={{height:"100vh"}}/>
    </div>
    
    <div className='d-flex flex-column col-lg-6 col-12 justify-content-center'>
      <div className='mt-3 pt-5'>

      
      <img src={logo} alt="" width={150} className='m-5 d-lg-none' />
      <p className='text-secondary mx-1 d-flex align-items-center'onClick={()=>{navigate('/')}}><IoArrowBackCircleOutline/>
      <div className='mx-1'>Toddle home</div></p>
      <h2 className='fw-bold mx-1'>Student account</h2>
      <form onSubmit={handleSubmit} className='d-flex flex-column gap-2'>
        <p className='fw-bold'>Enter student sign-in code</p>
        <input type="text" placeholder='Enter your email id' className='flex items-center empty:ml-0 text-label-2 text-textSubtle group-hover/btn:text-textDefault ml-2 border border-disabled p-2 rounded col-6' name='email' autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="text" placeholder='Password' className='flex items-center empty:ml-0 text-label-2 text-textSubtle group-hover/btn:text-textDefault ml-2 border border-disabled p-2 rounded col-6' name='password' autoComplete='off' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit' className='mx-2 col-2 rounded border border-none text-secondary fw-bold p-2'>Next</button>
      </form>
      <small>Don't have an account? <a href="/studentRegister" style={{textDecoration:"none"}}>Create new</a></small>

      <div className='m-4 mx-2 d-flex align-items-center'>
      <hr class="solid col-3 text-secondary mx-2"/>
        <div className='text-secondary'>or sign in with</div>
        <hr class="solid col-3 text-secondary mx-2"/>

        
      </div>
      <div className='d-flex text-secondary gap-3'>
        

        
        <button className='p-2 border border-disabled rounded w-25 d-flex align-items-center justify-content-center flex-column' style={{background:"none"}}>
            <img src={googleLogo3d} alt="" width={30} />
            <div className='mx-2'>
                Google
            </div>
        </button>
        <button className='p-1 border border-disabled rounded w-25 d-flex align-items-center justify-content-center flex-column' style={{background:"none"}}>

            <img src={microsoftLogo3d} alt="" width={50} />
            <div>
                Microsoft
            </div>
        </button>
      
        <button className='p-1 border border-disabled rounded w-25 d-flex align-items-center justify-content-center flex-column' style={{background:"none"}}>

            <img src={cleverLogo3d} alt="" width={40} />
            <div>
                Clever
            </div>
        </button>
        <button className='p-1 border border-disabled rounded w-25 d-flex align-items-center justify-content-center flex-column' style={{background:"none"}}>

            <img src={microsoftLogo3d} alt="" width={50} />
            <div>
                Microsoft
            </div>
        </button>
        <button className='p-1 border border-disabled rounded w-25 d-flex align-items-center justify-content-center flex-column' style={{background:"none"}}>

            <img src={lexLogo3d} alt="" width={150} />
            <div>
                Lex
            </div>
        </button>
      </div>
      
      
      
        </div>
    </div>
    </div>
  )
}
