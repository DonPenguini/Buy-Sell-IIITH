  import * as React from 'react';
  import DashboardIcon from '@mui/icons-material/Dashboard';
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  import PersonIcon from '@mui/icons-material/Person';
  import SearchIcon from '@mui/icons-material/Search';
  import LocalShippingIcon from '@mui/icons-material/LocalShipping';
  import HistoryIcon from '@mui/icons-material/History';
  import { Outlet } from 'react-router';
  import { ReactRouterAppProvider } from '@toolpad/core/react-router';
  import type { Navigation } from '@toolpad/core/AppProvider';


  const NAVIGATION: Navigation = [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      title: 'Dashboard',
      segment: 'dash',
      icon: <DashboardIcon />,
    },
    {
      title: 'Orders',
      segment: 'dash/orders',
      icon: <HistoryIcon />,
    },
    {
      title: 'Profile',
      segment: 'dash/profile',
      icon: <PersonIcon />,
    },
    {
      title: 'SearchItems',
      segment: 'dash/search',
      icon: <SearchIcon />,
    },
    {
      title: 'DeliverItems',
      segment: 'dash/deliver',
      icon: <LocalShippingIcon />,
    },
    {
      title: 'Cart',
      segment: 'dash/cart',
      icon: <ShoppingCartIcon />,
    },
  ];

  const BRANDING = {
    title: "Buy-Sell @ IIIT-H",
  };


  export default function App() {
    
    return (
      <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
        <Outlet />
      </ReactRouterAppProvider>
    );
  }