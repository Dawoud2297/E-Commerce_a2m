import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ApolloProvider } from "@apollo/client";
import { Slide, ToastContainer } from 'react-toastify';
import client from "./ApolloClient.js";
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <CartProvider>
    <App />
    </CartProvider>
    <ToastContainer
        position= "top-center"
        autoClose= "2000"
        hideProgressBar= {true}
        closeOnClick= {true}
        draggable= {true}
        transition={Slide}
        theme= "dark"
        limit={1}
      />
  </ApolloProvider>
);
