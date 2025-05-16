/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/layouts/Spinner';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    setCustomMsg('Waking up The Server! Please Wait, This May Take A Moment');
    setLoading(true);
    try {
      const { data } = await axios.post(
        'https://expense-management-system-backend-t2f3.onrender.com/api/v1/users/login',
        values
      );
      setLoading(false);
      setCustomMsg('');
      message.success('Login Successful');
      localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }));
      navigate('/');
    } catch (error) {
      setLoading(false);
      setCustomMsg('');
      console.error(error);
      message.error('Something went wrong');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setCustomMsg('Signing in with Google...');
    try {
      const res = await fetch('https://expense-management-system-backend-t2f3.onrender.com/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        message.success('Signed in successfully with Google');
        navigate('/');
      } else {
        message.error(data.message || 'Google sign-in failed');
      }
    } catch (err) {
      console.error(err);
      message.error('Google sign-in error');
    } finally {
      setLoading(false);
      setCustomMsg('');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="register-page" style={{ position: 'relative' }}>
      {loading && <Spinner />}
      {loading && customMsg && (
        <div
          style={{
            position: 'fixed',
            top: '60%',
            width: '100%',
            textAlign: 'center',
            zIndex: 1001,
            fontSize: '18px',
            color: '#333',
            fontWeight: '500',
          }}
        >
          {customMsg}
        </div>
      )}

      <Form layout="vertical" onFinish={submitHandler}>
        <h1>Login</h1>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input type="password" />
        </Form.Item>
        <div className="l-reg">
          <Link to="/Register">Not A User? Register</Link>
        </div>
        <div className="btn-reg">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
        <Form.Item style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => message.error('Google sign-in failed')}
            />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;