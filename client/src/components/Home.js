import React, { useState } from 'react';

const Home = () => {
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');


    const register = async () => {
        const body = {
            username: registerUsername,
            password: registerPassword
        }

        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        console.log(response);
    };
    const login = async () => {
        const body = {
            username: loginUsername,
            password: loginPassword
        }
        
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        console.log(response);
    };
    const getUser = async () => {
        const response = await fetch('/user');
    };

    return (
        <div>
            <h1>Homepage</h1>
            {/* <a href='users/login'>Log In</a> */}

            <div>
                <h1>Register</h1>
                <input placeholder='username' onChange={e => setRegisterUsername(e.target.value)}/>
                <input placeholder='password' onChange={e => setRegisterPassword(e.target.value)}/>
                <button onClick={register}>Submit</button>
            </div>

            <div>
                <h1>Login</h1>
                <input placeholder='username' onChange={e => setLoginUsername(e.target.value)}/>
                <input placeholder='password' onChange={e => setLoginPassword(e.target.value)}/>
                <button onClick={login}>Submit</button>
            </div>


            <div>
                <h1>Get User</h1>
                <button onClick={getUser}>Submit</button>
            </div>
        </div>
        
    )
}

export default Home;