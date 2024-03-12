import React,{createContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const AuthContext = createContext({
    currentUser: null,
    setCurrentUser: ()=>{},
})

const AuthProvider = ({children})=>{
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser',JSON.parse(window.localStorage.getItem('currentUser')))

  const handleCurrentUser = (currentUser)=>setCurrentUser(currentUser)
    return(
        <AuthContext.Provider 
        value={{
            currentUser,
            setCurrentUser: handleCurrentUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext,AuthProvider}