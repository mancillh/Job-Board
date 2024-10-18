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

    setFormState({
      ...formState,
      [name]: value,
    });
  };

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
