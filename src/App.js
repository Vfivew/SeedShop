import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <Header/>
      <Navbar/>
      <main>
        <Routes>
          <Route path='/'  />
          <Route path='/seedvegetable'  />
          <Route path='/seedfruit'  />
          <Route path='/othergoods' />
          <Route path='/authorization' />
          <Route path='/contact'  />
          <Route path='/aboutsus' />
          <Route path='/paymentanddeliver' />
          <Route path='*'  />
        </Routes>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
