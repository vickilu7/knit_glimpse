import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Register = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const roleRef = useRef();

    async function onSubmitForm (e) {
        e.preventDefault();

        if (passwordRef.current.value.length <= 6){
            return setError('Please use more than 6 characters for password');
        } else if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match');
        }
        
        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);

            const body = 
            {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value,
                role: roleRef ? roleRef.current.value : ''
            }

            const response = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            console.log('User registered!', await response.json());

            history.push('/');
        } catch {
            setError('Failed to create account');
        }
        setLoading(false);
         
    }
    
    return (
        <div>
            <h1>Register</h1>
            {error && <h4>{error}</h4>}
            <form onSubmit={onSubmitForm}>
                <div>
                    <input type="text" id="firstName" name="firstName" placeholder="First Name" 
                    required ref={firstNameRef}/>
                </div>
                <div>
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name" 
                    required ref={lastNameRef}/>
                </div>
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
                <div>
                    <input
                    type="password"
                    id="password2"
                    name="password2"
                    placeholder="Confirm Password"
                    required
                    ref={passwordConfirmRef}
                    />
                </div>
                <div>
                    <input type="text" id="role" name="role" placeholder="Role" 
                    ref={roleRef}/>
                </div>
                <button disabled={loading} type='submit'>Register</button>

                <div>
                Already registered? <Link to='/login'>Login here</Link>
                </div>
                
            </form>

        
        </div>
        
    )
}

export default Register;