import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import Layout from './layouts/dashboard';
import DashboardPage from './pages';
import SignInPage from './pages/signin';
import Homepage from './pages/home';
import SignUpPage from './pages/signup';
import { AppProvider } from '@toolpad/core/AppProvider';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/appContext';
import axios from 'axios';
import  ProtectedRoute from './components/ProtectedRoutes';
import ProfilePage from './pages/profile';
import SearchItems from './pages/searchitems';
import ItemDetail from './pages/item';
import OrdersHistory from './pages/ordershistory';
import DeliverItems from './pages/deliveritems';
import Cart from './pages/cart';

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: '', 
    children: [
      {
        path: '', 
        Component: Homepage,
      },
      {
        path: 'signin', 
        Component: SignInPage,
      },
      {
        path: 'signup',
        Component: SignUpPage,
      },
    ],
  },
  {
    path: 'dash', 
    Component: App, 
    children: [
      {
        path: '',
        Component: ()=>(
            <ProtectedRoute>
              <Layout />   
            </ProtectedRoute>
            // Prot routes automatic -> children
        ),
        children: [
          {
            path: '', 
            Component: ()=>(
                <DashboardPage />
            ),
          },
          {
            path: 'orders', 
            Component: OrdersHistory,
          },
          {
            path: 'profile',
            Component: ProfilePage,
          },
          {
            path: 'search',
            Component: SearchItems,
          },
          {
            path: 'items/:id',
            Component: ItemDetail,
          },
          {
            path: 'deliver',
            Component: DeliverItems,
          },
          {
            path: 'cart',
            Component: Cart,
          }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>,
);