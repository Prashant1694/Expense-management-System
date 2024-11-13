/* eslint-disable no-lone-blocks */
import React,{useState, useEffect} from 'react'
import {Form,Input,message} from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
//import Password from 'antd/es/input/Password';
import Spinner from '../components/layouts/Spinner';
const Login = () => {
    const [loading,setLoading] = useState(false)
    const navigate =useNavigate()
    const submitHandler= async(values) =>{
        try {
            setLoading(true)
            const {data} = await axios.post('/api/v1/users/login',values)
            setLoading(false)
            message.success('Login Successfull')
            localStorage.setItem('user',JSON.stringify({ ...data.user, password: ""}))
            navigate('/')
        } catch (error) {
            //console.error(error.response.data);
            setLoading(false)
            console.log(error);
            message.error('Something went wrong')
        }
        console.log(values)
    };
    //prevent for login user
    useEffect(() => {
        if(localStorage.getItem('user')){
            navigate('/')
        }
    },[navigate]);
  return (
    <div className="register-page">
        {loading && <Spinner/>}
        <Form layout="vertical" onFinish={submitHandler}>
            <h1>Login</h1>
            <Form.Item label="Email" name="email">
                <Input type='email'/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type='password'/>
            </Form.Item>
                <div className='l-reg'>
                <Link to={'/Register'}>Not A User? Register Here</Link>
                </div>
                <div className='btn-reg'>
                <button className='btn btn-primary'>Login</button>
                </div>
        </Form>
    </div>
  )
}

export default Login
