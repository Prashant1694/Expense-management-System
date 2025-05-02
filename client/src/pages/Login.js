/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/layouts/Spinner';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    setCustomMsg('Waking up The Server! Please Wait, This May Take A Moment'); // 👈 Set custom message
    setLoading(true);
    try {
      const { data } = await axios.post(
        'https://expense-management-system-backend-t2f3.onrender.com/api/v1/users/login',
        values
      );
      setLoading(false);
      setCustomMsg('');
      message.success('Login Successful');
      localStorage.setItem('user', JSON.stringify({ ...data.user, password: "" }));
      navigate('/');
    } catch (error) {
      setLoading(false);
      setCustomMsg('');
      console.error(error);
      message.error('Something went wrong');
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
          <Link to="/Register">Not A User? Register Here</Link>
        </div>
        <div className="btn-reg">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
