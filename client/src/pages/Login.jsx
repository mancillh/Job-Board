import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/queries';

import Auth from '../utils/auth';

// Importing Semantic UI Components
import { Button, Card, Container, Form, Message, Segment } from 'semantic-ui-react';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Container text>
      <Segment className="flex-row justify-center mb-4">
        <Card fluid>
          <Card.Content>
            <Card.Header className="bg-dark text-light p-2" textAlign="center">
              Login
            </Card.Header>
            <Card.Description>
              {data ? (
                <Message positive>
                  <Message.Header>Success!</Message.Header>
                  <p>
                    You may now head <Link to="/">back to the homepage</Link>.
                  </p>
                </Message>
            ) : (
              <form onSubmit={handleFormSubmit}>
               <Container text>
      <Segment className="flex-row justify-center mb-4">
        <Card fluid>
          <Card.Content>
            <Card.Header className="bg-dark text-light p-2" textAlign="center">
              Login
            </Card.Header>
            <Card.Description>
              {data ? (
                <Message positive>
                  <Message.Header>Success!</Message.Header>
                  <p>
                    You may now head <Link to="/">back to the homepage</Link>.
                  </p>
                </Message>

{error && (
  <Message negative className="my-3 p-3">
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


export default Login;