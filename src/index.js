import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './index.css';
import TokenContextProvider from './Context/TokenContext';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartProvider from './Context/Cart';



const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

root.render(
  <CartProvider>
  <QueryClientProvider client={queryClient}>
  <TokenContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TokenContextProvider>
  </QueryClientProvider>
  </CartProvider>
);


