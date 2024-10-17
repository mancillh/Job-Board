import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/queries'; // Ensure the path is correct

import Auth from '../utils/auth';

// Importing Semantic UI Components
import { Button, Card, Container, Form, Message, Segment } from 'semantic-ui-react';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [addProfile, { error, data, loading }] = useMutation(ADD_PROFILE);

  // Update state based on form input changes
  const handleChange = (event, { name, value }) => {
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

    // Optionally, clear form values upon successful signup
    setFormState({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <Container text>
      <Segment vertical className="flex-row justify-center mb-4">
        <Card fluid>
          <Card.Content>
            <Card.Header as="h2" textAlign="center" className="bg-dark text-light p-2">
              Sign Up
            </Card.Header>
            <Card.Description>
              {data ? (
                <Message positive>
                  <Message.Header>Success!</Message.Header>
                  <p>
                    You may now head <Link to="/">back to the homepage.</Link>
                  </p>
                </Message>
              ) : (
                <Form onSubmit={handleFormSubmit} loading={loading} noValidate>
                  <Form.Input
                    fluid
                    label="Username"
                    placeholder="Your username"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                  <Form.Input
                    fluid
                    label="Email"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Input
                    fluid
                    label="Password"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    required
                  />
                  <Button type="submit" primary fluid>
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
            </Card.Description>
          </Card.Content>
        </Card>
      </Segment>
    </Container>
  );
};

export default Signup;
