import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import InfoPage from './page/InfoPage/InfoPage';
import Home from './page/Home/Home';
import SeedProduct from './components/SeedProduct/SeedProduct';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { ProductProvider } from './context/contexts';
import Form from './components/Form/Form';

function App() {
  return (
    <Router>
       <ProductProvider>
      <Header/>
      <Navbar/>
      <main>
        <Routes>
          <Route path='/'  element={<Home/>}/>
          <Route path='/seedvegetable'  element={<SeedProduct productTypeFilter="Овочі" />} />
          <Route path='/seedberries' element={<SeedProduct productTypeFilter="Ягоди" />} />
          <Route path='/othergoods' element={<Form/>} />
          <Route path='/authorization' />
          <Route path="/tabs/contact" element={<InfoPage activeTabId={1} />} />
          <Route path="/tabs/aboutsus" element={<InfoPage activeTabId={2} />} />
          <Route path="/tabs/paymentdeliver" element={<InfoPage activeTabId={3} />} />
          <Route path='/product/:productId' element={<ProductDetails />} />
          <Route path='*'  />
        </Routes>
      </main>
        <Footer />
        </ProductProvider>
    </Router>
  );
}

export default App;
