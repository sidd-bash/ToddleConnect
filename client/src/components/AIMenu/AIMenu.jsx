import React,{useState} from 'react'
import { GrTextAlignFull } from "react-icons/gr"; 
import { MdOutlineShortText } from "react-icons/md";
import { PiTranslate } from "react-icons/pi";
import { TiSpannerOutline } from "react-icons/ti";
import './AIMenu.css'
export default function AIMenu({setArgument,setLanguage}) {
    const [showLanguageTab,setShowLanguageTab] = useState(false)
    const handleLanguage = (language)=>{
        setLanguage(language);
        setArgument(4)
        setShowLanguageTab(false)
    }
  return (
    <div className='border border-disabled'>
      <button className='p-2 bg-white align-items-center d-flex text-secondary' style={{width:"50vw", height:"6vh",border:"none"}} onClick={()=>setArgument(1)}>
      <MdOutlineShortText />
        <div className='mx-2'>

        Shorten
        </div>
        </button>
      <button className='p-2 bg-white align-items-center d-flex text-secondary' style={{width:"50vw", height:"6vh",border:"none"}} onClick={()=>setArgument(2)}>
      <GrTextAlignFull />
        <div className='mx-2'>

        Elaborate
        </div>
        </button>
        <button className='p-2 bg-white align-items-center d-flex text-secondary' style={{width:"50vw", height:"6vh",border:"none"}} onClick={()=>setArgument(3)}>
        <TiSpannerOutline />
        <div className='mx-2'>

        Fix spelling and grammar
        </div>
        </button>
        <button className='p-2 bg-white align-items-center d-flex text-secondary' style={{width:"50vw", height:"6vh",border:"none"}} onClick={()=>setShowLanguageTab(true)}>
      <PiTranslate />
        <div className='mx-2'>

        Translate to
        </div>
        </button>
        {showLanguageTab && <div id='languageTab' className='rounded border border-disabled col-2 mx-5 mb-5'>
            <div className='p-1' onClick={()=>handleLanguage('French')}>French</div>
            <div className='p-1' onClick={()=>handleLanguage('Japanese')}>Japanese</div>
            <div className='p-1' onClick={()=>handleLanguage('Chinese')}>Chinese</div>
        </div>}
    </div>
  )
}
