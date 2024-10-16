import { Button } from 'semantic-ui-react'
import '../styles/Error.css';
import { useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-container">
      <h2>Oops!</h2>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button href='/'>Navigate Home</Button>
    </div>
  );
}