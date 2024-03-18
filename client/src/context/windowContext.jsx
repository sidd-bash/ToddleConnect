import React, {createContext,useState,useEffect} from 'react'

const WindowContext = createContext({
    windowState:false,
    setWindowState:()=>{}
})

const WindowProvider = ({children})=>{
  const [windowState,setWindowState] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleWindowState = (windowState)=>{
    if(windowSize.width<480) setWindowState(windowState);
    console.log('this')
    }
    return(
        <WindowContext.Provider 
        value={{
            windowState,
            setWindowState:handleWindowState
        }}>
            {children}
        </WindowContext.Provider>
    )
}


export { WindowContext,WindowProvider}