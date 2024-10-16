import 'semantic-ui-css/semantic.min.css'
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Corkboard from './components/Corkboard'; // Assuming you have a Corkboard component

function App() {
  return (
    <>
      <Navbar />
      <Header />
      
      {/* Main content section */}
      <main>
        <Corkboard />  {/* Main interactive job listing corkboard */}
      </main>
      
      <Footer />
    </>
  );
}

export default App;
