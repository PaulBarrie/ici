import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import AccountView from './views/account/AccountView';
import CustomerListView from './views/customer/CustomerListView';
import DashboardView from './views/reports/DashboardView';
import LoginView from './views/auth/LoginView';
import NotFoundView from './views/errors/NotFoundView';
import ProductListView from './views/product/ProductListView';
import RegisterView from './views/auth/RegisterView';
import SettingsView from './views/settings/SettingsView';
import {PrivateRoute} from './redux/components/PrivateRoute';
import MapStores from './views/stores'

const routes= () =>  [
  {
    path: 'app',
    element: (
      <PrivateRoute>
         <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'stores', element: <MapStores />},
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: (
      <MainLayout/>
    ),
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
