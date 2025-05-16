/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/layouts/Spinner';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const submitHandler = async (values) => {
    setCustomMsg('Waking up The Server! Please Wait, This May Take A Moment');
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/v1/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      setCustomMsg('');
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setCustomMsg('');
      message.error('Something went wrong');
      console.error("Registration Error:", error);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setCustomMsg('Signing up with Google...');
    try {
      const res = await fetch('http://localhost:8080/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        message.success("Signed up successfully with Google");
        navigate('/');
      } else {
        message.error(data.message || 'Google signup failed');
      }
    } catch (err) {
      console.error(err);
      message.error('Google signup error');
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
          <Link to={'/login'}>Already a User? Login</Link>
        </div>
        <div className="btn-reg">
          <button className="btn btn-primary" type="submit">Register</button>
        </div>
        <Form.Item style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => message.error('Google sign-up failed')}
            />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;