import React from 'react'
import { Button, Form, Input } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import '../Style/Login.css'

function Login() {
    const navigate = useNavigate();
    const Item = styled(Paper)();
    const onFinish = (values) => {
      axios.post('http://localhost:3000/user/login', {
        email: values.email,
        password: values.password
      })
      .then(response => {
        // Handle success
        const token = response.data.token;
        const userId = response.data.userId;
        const email = values.email; 
      
        // Store token and user ID in local storage
       
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userId', userId); // Now userId should be defined
        const adminEmail = 'admin.111@gmail.com';
        // Redirect to another page or perform any necessary actions
        if (email === adminEmail) {
          navigate('/adminBoard'); // Redirect to admin page
        } else {
          navigate('/viewProduct'); // Redirect to shopping page
        }
      })
      
        .catch(error => {
          // Handle error
          console.error('Error during login:', error);
          // Display error message to the user
        });
      
    };
  
  return (
   <>
    <Box>
    <h1 className='head-signUp' >Welcome Back!</h1>
<Grid container spacing={0}  className='containerPIG'>

<Grid size={4}>
        <div className="image-container-fomrs">
        <img src="login.jpeg" alt="" className='iMMage'/>
        </div>
        </Grid>
    <Grid item xs={6}  >
     <Item className="form-contaiNER">
    <div className="form-container-DIVV">
    <div className="IMMG-container">      
    </div>
    <div className="form-contENt">
    <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email ID"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Link to="/signup"><p>Forget Password? </p></Link>

        <Form.Item>
        <br />
        <br />
          <Button type="primary" htmlType="submit">
            Login
          </Button>
         
        </Form.Item>

        <Link to="/signup"><p>Don't have an account? Sign up</p></Link>
      </Form>
    </div>   
    </div>
     </Item>
  </Grid>
</Grid> 
</Box>
   </>
  )
}

export default Login