import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Corkboard from './components/Corkboard'; // Assuming you have a Corkboard component

function App() {
  return (
    <>
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
