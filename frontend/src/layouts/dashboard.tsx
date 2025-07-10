import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardLayout} from '@toolpad/core/DashboardLayout';
import { AppContext } from '../context/appContext';
import { useContext } from 'react';
import CustomToolbar from '../context/customToolbar';

export default function Layout() {
  const appContext = useContext(AppContext);

  return (
    <DashboardLayout
      slots={{
        toolbarActions: CustomToolbar,
      }}
      >
        <Outlet />
    </DashboardLayout>
  );
}
