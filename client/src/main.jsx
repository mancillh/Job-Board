import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
  createHttpLink 
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App.jsx';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Profile from './pages/Profile';

// Set up Apollo Client
const httpLink = createHttpLink({
  uri: '/graphql', // Remove the hardcoded localhost:3001
});

const authLink = setContext((_, { headers }) => {
  // Get token from localStorage
  const token = localStorage.getItem('id_token');
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// Create Apollo Client with auth link
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Add authLink to the chain
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          savedJobs: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  connectToDevTools: true,
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/profile',
        element: <Profile />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);