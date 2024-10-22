<<<<<<< HEAD
// Signup.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/queries';

import Auth from '../utils/auth';

import {
  Container,
  Form,
  Button,
  Card,
  Header,
  Message,
} from 'semantic-ui-react';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

=======
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

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }

    // Optionally clear form values
    setFormState({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <Container textAlign="center" style={{ marginTop: '5em' }}>
      <Card centered>
        <Card.Content>
          <Header as="h2" color="blue" textAlign="center">
            Sign Up
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
                <label>Username</label>
                <Form.Input
                  placeholder="Your username"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
              </Form.Field>
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
                color="blue"
                fluid
                size="large"
                loading={addProfile.loading}
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

export default Signup;
=======
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
>>>>>>> 64b398fcf270ff80781255435320c71eb3edb0db
