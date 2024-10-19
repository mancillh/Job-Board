import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { ADD_PROFILE } from '../utils/queries';
// import Auth from '../utils/auth';
import { Form, Button, Container, Header, Message } from 'semantic-ui-react';
import '../styles/AuthPages.css';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  // const [addProfile, { error, data }] = useMutation(ADD_PROFILE);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Placeholder for form submission
    console.log('Form submitted:', formState);
    setSuccess(true);
    // Reset form after submission
    setFormState({ name: '', email: '', password: '' });
  };

  return (
    <div className="auth-page">
      <Container className="auth-container">
        <Header as='h2' textAlign='center' className="auth-header">Sign Up</Header>
        {success ? (
          <Message positive className="auth-message">
            <Message.Header>Success!</Message.Header>
            <p>You may now head <Link to="/">back to the homepage.</Link></p>
          </Message>
        ) : (
          <Form onSubmit={handleFormSubmit} className="auth-form" style={{ marginTop: 0 }}>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Your username'
              name="name"
              type="text"
              value={formState.name}
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
        )}
        {error && (
          <Message negative className="auth-message">
            <Message.Header>Error</Message.Header>
            <p>{error}</p>
          </Message>
        )}
      </Container>
    </div>
  );
};

export default Signup;