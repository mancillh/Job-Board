<<<<<<< HEAD
// Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/queries';

import Auth from '../utils/auth';

import {
  Container,
  Form,
  Button,
  Card,
  Header,
  Message,
  // Segment,
} from 'semantic-ui-react';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import { Form, Button, Container, Header, Message } from 'semantic-ui-react';
import '../styles/AuthPages.css';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
>>>>>>> 64b398fcf270ff80781255435320c71eb3edb0db
    setFormState({
      ...formState,
      [name]: value,
    });
  };

<<<<<<< HEAD
  // Submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
=======
  const handleFormSubmit = async (event) => {
    event.preventDefault();
>>>>>>> 64b398fcf270ff80781255435320c71eb3edb0db
    try {
      const { data } = await login({
        variables: { ...formState },
      });
<<<<<<< HEAD

=======
>>>>>>> 64b398fcf270ff80781255435320c71eb3edb0db
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
<<<<<<< HEAD

    // Clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Container textAlign="center" style={{ marginTop: '5em' }}>
      <Card centered>
        <Card.Content>
          <Header as="h2" color="teal" textAlign="center">
            Login
          </Header>
          {data ? (
            <Message positive>
              <Message.Header>Success!</Message.Header>
              <p>
                You may now head <Link to="/">back to the homepage.</Link>
              </p>
            </Message>
          ) : (
            <Form onSubmit={handleFormSubmit}>
              <Form.Field required>
                <label>Email</label>
                <Form.Input
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </Form.Field>
              <Form.Field required>
                <label>Password</label>
                <Form.Input
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  required
                />
              </Form.Field>
              <Button
                type="submit"
                color="teal"
                fluid
                size="large"
                loading={login.loading}
              >
                Submit
              </Button>
            </Form>
          )}
          {error && (
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>{error.message}</p>
            </Message>
          )}
        </Card.Content>
      </Card>
    </Container>
  );
};

export default Login;
=======
  };

  return (
    <div className="auth-page">
      <Container className="auth-container">
        <Header as='h2' textAlign='center' className="auth-header">Login</Header>
        <Form onSubmit={handleFormSubmit} className="auth-form">
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

export default Login;
>>>>>>> 64b398fcf270ff80781255435320c71eb3edb0db
