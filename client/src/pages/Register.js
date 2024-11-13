/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/layouts/Spinner';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const submitHandler = async (values) => {
        setLoading(true);
        try {
            await axios.post("/users/register", values);  // Ensure this endpoint matches your server route
            message.success("Registration Successful");
            setLoading(false);
            navigate("/login");
        } catch (error) {
            setLoading(false);
            message.error('Something went wrong');
            console.error("Registration Error:", error);
        }
    };

    // Prevent logged-in users from accessing the registration page
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="register-page">
            {loading && <Spinner />}
            <Form layout="vertical" onFinish={submitHandler}>
                <h1>Registration Form</h1>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
                    <Input type="email" />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
                    <Input type="password" />
                </Form.Item>
                <div className="l-reg">
                    <Link to={'/login'}>Already a User? Login Here</Link>
                </div>
                <div className="btn-reg">
                    <button className="btn btn-primary" type="submit">Register</button> {/* Ensure button type="submit" */}
                </div>
            </Form>
        </div>
    );
};
export default Register;
