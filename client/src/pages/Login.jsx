import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../utils/queries';
// import Auth from '../utils/auth';
import { Form, Button, Container, Header, Message } from 'semantic-ui-react';
import '../styles/AuthPages.css';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  // const [login, { error, data }] = useMutation(LOGIN_USER);
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
    setFormState({ email: '', password: '' });
  };

  return (
    <div className="auth-page">
      <Container className="auth-container">
        <Header as='h2' textAlign='center' className="auth-header">Login</Header>
        {success ? (
          <Message positive className="auth-message">
            <Message.Header>Success!</Message.Header>
            <p>You may now head&nbsp;<Link to="/">back to the homepage.</Link></p>
          </Message>
        ) : (
          <Form onSubmit={handleFormSubmit} className="auth-form" style={{ marginTop: 0 }}>
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
              Login
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

export default Login;