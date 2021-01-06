import React, {useState} from 'react';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [role, setRole] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = 
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    password2: password2,
                    role: role
                }
            
            const response = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            window.location.replace('/users/login'); //can't always go directly to login, what if failed?
        } catch (err) {
            console.error(err.message);
        }
    }
    
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={onSubmitForm}>
                <div>
                    <input type="text" id="firstName" name="firstName" placeholder="First Name" 
                    onChange={e => setFirstName(e.target.value)} required />
                </div>
                <div>
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name" 
                    onChange={e => setLastName(e.target.value)} required />
                </div>
                <div>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <input
                    type="password"
                    id="password2"
                    name="password2"
                    placeholder="Confirm Password"
                    onChange={e => setPassword2(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <input type="text" id="role" name="role" placeholder="Role" 
                    onChange={e => setRole(e.target.value)}/>
                </div>
                <div>
                    <input type="submit" value="Register" />
                </div>

                <a href="/users/login">Already registered? Login here</a>
            </form>

        
        </div>
        
    )
}

export default Register;