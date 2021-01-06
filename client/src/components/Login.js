import React from 'react';

const Login = () => {

    
    return (
        <div>
            <h1>Login</h1>
            <form action="/users/login" method="POST">
                <div>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    />
                </div>
                <div>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    />
                </div>
                <div>
                    <input type="submit" value="Login" />
                </div>

                <a href="/users/register">Register</a>
            </form>

        
        </div>
        
    )
}

export default Login;