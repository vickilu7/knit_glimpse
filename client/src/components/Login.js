import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext';

import './forms.css';
import { Form, Input, Button, Alert } from 'antd';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const onSubmitForm = async () => {
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            history.push('/');
            
        } catch {
            setError('Failed to sign in');
        }
        setLoading(false);
    }
    
    return (
        <div className='container' >
            <h1 style={{fontSize: 36, fontWeight: 800}}>Log In</h1>
            {error && 
            <Alert
                message={error}
                type="error"
                showIcon
                style={{textAlign: 'left', width:'600px', margin:'auto'}}
            />
            }

            <Form
                name="login"
                initialValues={{
                    remember: true,
                }}
                layout="vertical"
            >   
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                    ]}
                    onChange={e => setEmail(e.target.value)}
                >
                    <Input placeholder="My Awesome Project"/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                    onChange={e => setPassword(e.target.value)}
                >
                    <Input.Password />
                </Form.Item>
            </Form>

            <Button 
                type="primary"
                disable={loading.toString()} 
                onClick={onSubmitForm}
            >   Log In
            </Button>
            <div className='subtext'>
                Dont have an account yet? <Link to='/register'>Join Knit</Link>
            </div>

        </div>
        
    )
}

export default Login;