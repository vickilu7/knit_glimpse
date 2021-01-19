import React, {useContext, useState, useEffect} from 'react';
import { auth } from './firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    
    function logout() {
        return auth.signOut();
    }
    
    useEffect( () => {
        // only run once when we mount component
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);  // don't render any of application until current user set for first time
        })
        // unsubscribe us from the onAuthStateChanged listener when component unmounts
        return unsubscribe;
    }, []);


    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return(
        <AuthContext.Provider value = {value}>
            { !loading && children } 
        </AuthContext.Provider>
    )
}