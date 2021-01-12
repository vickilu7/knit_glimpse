import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext';

import { Form, Input, Button, Alert, Row, Col } from 'antd';
import { ReactComponent as BGImage} from './reg.svg';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');

    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const onSubmitForm = async () => {

        if (password.length <= 6){
            return setError('Please use more than 6 characters for password');
        } else if (password !== confirmpassword){
            return setError('Passwords do not match');
        }
        
        try {
            setError('');
            setLoading(true);
            await signup(email, password);

            const body = 
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role ? role : ''
            }

            const response = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            console.log('User registered!', await response.json());

            history.push('/');
        } catch {
            setError('Failed to create account, email taken.');
        }
        setLoading(false);
    }
    
    return (
        <div>
        <div className='container'>
            <h1 style={{fontSize: 36, fontWeight: 800}}>Sign Up for Knit</h1>
            <p>Join other self-starters to bring your ideas to life.</p>
            {error && 
            <Alert
                message={error}
                type="error"
                showIcon
                className='alert'  
            />
            }

            <Form
                name="register"
                initialValues={{
                    remember: true,
                }}
                layout="vertical"
                className="form"
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="First Name"
                            name="firstname"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                            ]}
                            onChange={e => setFirstName(e.target.value)}
                        >
                            <Input placeholder="Hello"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Last Name"
                            name="lastname"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                            ]}
                            onChange={e => setLastName(e.target.value)}
                        >
                            <Input placeholder="World"/>
                        </Form.Item>
                    </Col>
                </Row>
                
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
                    <Input placeholder="helloworld@email.com"/>
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

                <Form.Item
                    label="Confirm Password"
                    name="confirmpassword"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                    onChange={e => setConfirmPassword(e.target.value)}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                    onChange={e => setRole(e.target.value)}
                >
                    <Input placeholder="Developer, designer, student, etc..."/>
                </Form.Item>
            </Form>

            <Button 
                type="primary"
                disable={loading.toString()} 
                onClick={onSubmitForm}
                className='btn-action'
            >   Create Account
            </Button>
            <div className='subtext'>
                Already have an account? <Link to='/login' id='link'>Log In</Link>
            </div>
        </div>
        <image><BGImage /></image>
        </div>
    )
}

export default Register;