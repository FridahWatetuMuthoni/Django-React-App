import React,{createContext,useState} from 'react';

const AuthContext = createContext({})

export function AuthProvider(props) {

    const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')):null);
    const [user, setUser] = useState(localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):null)

    let contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens
    }


    return (
    <AuthContext.Provider value={contextData}>
        {props.children}
    </AuthContext.Provider>
    )

}

export default AuthContext;

