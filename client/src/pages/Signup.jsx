import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Form, Button, Container, Header, Message } from 'semantic-ui-react';
import '../styles/AuthPages.css';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [signupUser, { error }] = useMutation(SIGNUP_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const { data } = await signupUser({
        variables: { ...formState },
      });
      console.log('Signup response:', data); // Added this line for debugging
      Auth.login(data.signup.token);
    } catch (e) {
      console.error('Signup error:', e);
    }
  };

  return (
    <div className="auth-page">
      <Container className="auth-container">
        <Header as='h2' textAlign='center' className="auth-header">Sign Up</Header>
        <Form onSubmit={handleFormSubmit} className="auth-form">
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            placeholder='Your username'
            name="username"
            type="text"
            value={formState.username}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon='mail'
            iconPosition='left'
            placeholder='Your email'
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <Button color='black' fluid size='large' type='submit'>
            Sign Up
          </Button>
        </Form>
        {error && (
          <Message negative className="auth-message">
            <Message.Header>Error</Message.Header>
            <p>{error.message}</p>
          </Message>
        )}
      </Container>
    </div>
  );
};

export default Signup;