import React,{useState, useContext} from 'react'
import { useNavigate } from "react-router-dom"
import logo from "../../images/toddleLogo.png"
import logoWhite from "../../images/toddleLogoWhite.jpg"
import landing from "../../images/teacherLogin.png"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { AuthContext } from '../../context/authContext'
export default function TeacherRegister() {
    const navigate = useNavigate();
    const {setCurrentUser,currentUser,setAuthToken} = useContext(AuthContext)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) =>{
        console.log('current user:',currentUser)
        e.preventDefault();
        axios.post('https://toddle-connect.vercel.app/graphql',{
            "query": `mutation($first_name: String!, $last_name: String!, $email: String!, $password: String!, $post: String!) {createUser(first_name: $first_name, last_name: $last_name, email: $email, password: $password, post: $post) {user {id first_name last_name email post image}, authToken }}`,
            "variables":{
              "first_name": firstName,
              "last_name": lastName,
              "email": email,
              "password": password,
              "post":"Teacher"
            }})
        .then(response => {
            // console.log('Response:', response.data.data.createUser.authToken,response.data.data.createUser.user);
            setAuthToken(response.data.data.createUser.authToken)
            setCurrentUser(response.data.data.createUser.user)
            // console.log(currentUser) 
            navigate('/main');
          }) 
          .catch(error => {
            console.error('Error:', error.message);
          });
    }
    return (

        <div className='d-flex justify-content-center col-12'>
            <img src={logoWhite} alt="" width={170} className='m-5 d-sm-none d-xs-none d-md-none d-lg-block' style={{ position: "absolute", left: "10px" }} />
            <div className='col-lg-6 d-xs-none d-sm-none d-md-none d-lg-block'>
                <img src={landing} alt="" style={{ height: "100vh" }} />
            </div>

            <div className='d-flex flex-column col-lg-6 col-12 justify-content-center'>
                <div className='mt-3 pt-5 w-75'>


                    <img src={logo} alt="" width={150} className='m-5 d-lg-none' />
                    <p className='text-secondary mx-1 d-flex align-items-center' onClick={()=>{navigate('/teacherLogin')}}><IoArrowBackCircleOutline />
                        <div className='mx-1'>Teacher account</div></p>
                    <h2 className='fw-bold mx-1'>Create your Toddle account</h2>
                    <p>Post and access children's learning moments, communicate with parents and receive school updates, all from your Toddle account</p>


                    <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
                        {/* <p className='fw-bold'>Sign in with email</p> */}
                        <input type="text" placeholder='First Name' className='flex items-center empty:ml-0 text-label-2 text-textSubtle group-hover/btn:text-textDefault ml-2 border border-disabled p-2 rounded col-6' name='firstName' autoComplete='off' value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                        <input type="text" placeholder='Last Name' className='flex items-center empty:ml-0 text-label-2 text-textSubtle group-hover/btn:text-textDefault ml-2 border border-disabled p-2 rounded col-6' name='lastName' autoComplete='off' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                        <input type="text" placeholder='Email' className='flex items-center empty:ml-0 text-label-2 text-textSubtle group-hover/btn:text-textDefault ml-2 border border-disabled p-2 rounded col-6' name='email' autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        {/* <input type="text" placeholder='Subjects you teach' className='flex items-center empty:ml-0 text-label-2 text-textSubtle group-hover/btn:text-textDefault ml-2 border border-disabled p-2 rounded col-6' name='email' autoComplete='off'/> */}
                        <input type="text" placeholder='Password' className='flex items-center empty:ml-0 text-label-2 text-textSubtle group-hover/btn:text-textDefault ml-2 border border-disabled p-2 rounded col-6' name='password' autoComplete='off' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <button type='submit' className='inline-flex items-center py-3 px-4 h-12 rounded-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-interactiveTwoDefault focus-visible:ring-offset-1 bg-surfaceDisabled cursor-not-allowed ParentLogin__submitButton___GbCd4' >Next</button>
                    </form>
                    <small>Already have an account? <a href="/teacherLogin" style={{ textDecoration: "none" }}>Sign in</a></small>
                </div>
            </div>
        </div>
    )
}
