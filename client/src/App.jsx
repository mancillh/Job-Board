import 'semantic-ui-css/semantic.min.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
function App() {
  return (
    <>
      <Navbar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default App;