import 'semantic-ui-css/semantic.min.css'
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Corkboard from './components/JobListCorkboard'; 

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <Corkboard />  
      <Footer />
    </>
  );
}

export default App;
