import React from 'react'
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { useNavigate , Link } from 'react-router-dom';
// import '../Style/SingUp.css';
import '../Style/SignUp.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import axios from 'axios';


function SignUp() {
    const Item = styled(Paper)();
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
        console.log('Form values:', values); // Log to check what's being sent

        const response = await axios.post('http://localhost:3000/user/signUp', {
            fullName: values.fullName,
            email: values.email,
            password: values.password,
            referenceID: values.referenceID || undefined
        });

        console.log('Data submitted successfully:', response.data);
        navigate('/login');
    } catch (error) {
        console.error('Error submitting data:', error); // Log full error object

        // Display the error message from the server
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message); // Show specific error message from server
        } else {
            alert('An error occurred during registration');
        }
    }
};


  

  return (
   <>
      <Box>
      <h1 className='head-signUp' >Create an Account</h1>
        <Grid container spacing={0}  className='containerX'>
        <Grid size={4}>
        <div className="image-container-fomrs">
            <img src="signUp.jpeg" alt="" className='imageSC'/>
        </div>
        </Grid>
        <Grid size={6}>
        <Item className="form-containerF"> 
       
       <div className="form-container-divVC">
     
        <div className="form-contentD">
        <Form onFinish={onFinish}>

    <Form.Item
        name="fullName"
        label="Full Name"
        className="form-item"
       
        rules={[
            {
                required: true,
                message: 'Please input your Full Name!',
                whitespace: true,
            },
        ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
        name="email"
        label="E-mail"
        className="form-item"
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
        className="gender-item"
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

    <Form.Item
        name="confirm"
        label="Confirm Password"
        className="gender-item"
        dependencies={['password']}
        hasFeedback
        rules={[
            {
                required: true,
                message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The passwords that you entered do not match!'));
                },
            }),
        ]}
    >
        <Input.Password />
    </Form.Item>

    <Form.Item
        name="referenceID"
        label="Reference ID"
        className="form-item"
       
        rules={[
            {
                
                message: 'Please input your nickname!',
                whitespace: true,
            },
        ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
            {
                validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
        ]}
    >
        <Checkbox>
            I have read the <a href="#">agreement</a>
        </Checkbox>
    </Form.Item>
   
    <Form.Item>
        <Button type="primary" htmlType="submit">
            Register
            <span></span>

        </Button>
        <p className='terms'>By registering, you agree to peppie's Terms of Service and Privacy Policy.</p>
    </Form.Item>
 <Link to = "/login"><p >Already have a account?  Login </p></Link>   
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

export default SignUp