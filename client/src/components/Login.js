import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function onSubmitForm (e) {
        e.preventDefault();
        
        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
            
        } catch {
            setError('Failed to sign in');
        }
        setLoading(false);
    }
    
    return (
        <div>
            <h1>Log In</h1>
            {error && <h4>{error}</h4>}
            <form onSubmit={onSubmitForm}>
                <div>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    ref={emailRef}
                    />
                </div>
                <div>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    ref={passwordRef}
                    />
                </div>
                <button disabled={loading} type='submit'>Log In</button>
                <div>
                    Need an account? <Link to='/register'>Sign Up</Link>
                </div>
                
            </form>

        
        </div>
        
    )
}

export default Login;