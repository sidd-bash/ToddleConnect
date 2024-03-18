import React from 'react'
import {useNavigate} from "react-router-dom"
import logo from "../../images/toddleLogo.png"
import logoWhite from "../../images/toddleLogoWhite.jpg"
import teacherLogo from "../../images/schoolLogo.jpg"
import studentLogo from "../../images/studentLogo.jpg"
import parentLogo from "../../images/parentLogo.jpg"
import landing from "../../images/landingPhoto.png"
import { GoArrowRight } from "react-icons/go";
import './Landing.css'

export default function Landing() {
    const navigate = useNavigate();
  return (
    
    <div className='d-flex justify-content-center col-12'>
        <img src={logoWhite} alt="" width={150} className='m-5 d-none d-md-block d-lg-block logo-white-small' style={{position:"absolute", left:"10px"}}/>
        <div className='col-lg-6 d-xs-none d-sm-none d-md-none d-lg-block'>
    <img src={landing} alt="" style={{height:"100vh"}} className='d-none d-md-block'/>
</div>

    
    <div className='d-flex flex-column col-lg-6 col-12 justify-content-center'>
      <img src={logo} alt="" width={150} className='m-5 d-lg-none' />
      <h2 className='fw-bold mx-2 mt-lg-5 pt-lg-5'>Welcome to Toddle!</h2>
      <p className='text-secondary mx-2'>Choose an account type to proceed</p>
      <button className='d-flex align-items-center rounded border border-disabled mt-3 mx-2 w-75 p-2 responsive-button' style={{background:"none"}} onClick={()=>navigate('/teacherLogin')}>
        <img src={teacherLogo} alt="" width={90} />
        <div className='d-flex flex-column justify-content-center w-75 align-items-start'>
            <div className='fw-bold'>Teacher account</div>
            <div className='fw-light text-secondary'>I'm a educator/school admin/IT specialist</div> 
        </div>
        <GoArrowRight className='fs-4 text-secondary mx-4 justify-self-end'/>
      </button>
      <button className='d-flex align-items-center rounded border border-disabled mt-3 mx-2 w-75 p-2 responsive-button' style={{background:"none"}} onClick={()=>navigate('/studentLogin')}>
        <img src={studentLogo} alt="" width={90} />
        <div className='d-flex flex-column justify-content-center w-75 align-items-start'>
            <div className='fw-bold'>Student account</div>
            <div className='fw-light text-secondary'>I'm a student</div> 
        </div>
        <GoArrowRight className='fs-4 text-secondary mx-4 justify-self-end'/>
      </button>
      <button className='d-flex align-items-center rounded border border-disabled mt-3 mx-2 w-75 p-2 responsive-button' style={{background:"none"}} onClick={()=>navigate('/parentLogin')}>
        <img src={parentLogo} alt="" width={90} />
        <div className='d-flex flex-column justify-content-center w-75 align-items-start'>
            <div className='fw-bold'>Parent account</div>
            <div className='fw-light text-secondary'>I'm a family member</div> 
        </div>
        <GoArrowRight className='fs-4 text-secondary mx-4 justify-self-end'/>
      </button>
      <div className='m-4 mx-2'>
        Here as a visitor? <a href="/" style={{color:"black"}}>Sign-in here</a>
      </div>
      <footer className='fw-light text-secondary mt-auto pt-auto mb-3'>
      <small>

      By signing in you agree to our Privacy Policy, Terms of Use and Cookie Policy.
      </small>
      <br />
      <small>

        ©Teacher Tools Private Limited. All Rights Reserved.
      </small>
        </footer>
    </div>
    </div>
  )
}
