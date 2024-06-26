import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ProductProvider } from "./context/contexts";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import InfoPage from "./page/InfoPage/InfoPage";
import Home from "./page/Home/Home";
import SeedProduct from "./components/SeedProduct/SeedProduct";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Form from "./components/Form/Form";
import AuthComponent from "./components/AuthComponent/AuthComponent";
import ErrorPage from "./page/ErrorPage/ErrorPage";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import Info from "./components/Info/Info";

import "./App.css";

function App() {
  return (
    <Router>
      <ProductProvider>
        <Header />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/seedvegetable"
              element={<SeedProduct productTypeFilter="Овочі" />}
            />
            <Route
              path="/seedberries"
              element={<SeedProduct productTypeFilter="Ягоди" />}
            />
            <Route path="/othergoods" element={<Info />} />
            <Route path="/authorization" element={<AuthComponent />} />
            <Route
              path="/tabs/contact"
              element={<InfoPage activeTabId={1} />}
            />
            <Route
              path="/tabs/aboutsus"
              element={<InfoPage activeTabId={2} />}
            />
            <Route
              path="/tabs/paymentdeliver"
              element={<InfoPage activeTabId={3} />}
            />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/form" element={<Form />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <ScrollTop />
        <Footer />
      </ProductProvider>
    </Router>
  );
}

export default App;
