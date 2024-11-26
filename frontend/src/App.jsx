import "./App.css";
import { Component } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import Products from "./_root/pages/Products";
import ProductDetails from "./_root/pages/ProductDetails";

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/:category" element={<Products />} />
              <Route path="/:category/:id" element={<ProductDetails />} />
            </Route>
            <Route path="/" element={<Navigate to="/all" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;