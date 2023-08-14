import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import InfoPage from './page/InfoPage/InfoPage';
import Home from './page/Home/Home';
import SeedSegetable from './page/SeedSegetable/SeedProduct';

function App() {
  return (
    <Router>
      <Header/>
      <Navbar/>
      <main>
        <Routes>
          <Route path='/'  element={<Home/>}/>
          <Route path='/seedvegetable'  element={<SeedSegetable/>}/>
          <Route path='/seedberries'  />
          <Route path='/othergoods' />
          <Route path='/authorization' />
          <Route path="/tabs/contact" element={<InfoPage activeTabId={1} />} />
          <Route path="/tabs/aboutsus" element={<InfoPage activeTabId={2} />} />
          <Route path="/tabs/paymentdeliver" element={<InfoPage activeTabId={3} />} />
          <Route path='*'  />
        </Routes>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
