import React,{createContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const AuthContext = createContext({
    currentUser: null,
    setCurrentUser: ()=>{},
    authToken: null,
    setAuthToken: ()=>{}

})

const AuthProvider = ({children})=>{
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser',JSON.parse(window.localStorage.getItem('currentUser')))
  const [authToken,setAuthToken] = useLocalStorage('authToken', null)
  const handleCurrentUser = (currentUser)=>setCurrentUser(currentUser)
  const handleAuthToken = (authToken)=>setAuthToken(authToken)
    return(
        <AuthContext.Provider 
        value={{
            currentUser,
            setCurrentUser: handleCurrentUser,
            authToken,
            setAuthToken: handleAuthToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext,AuthProvider}