import React from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginPage from './LoginPage';
import HomePage from '../../pages/HomePage';
import RolesPage from '../supply-chain/RolesPage';
import AddMedicinePage from '../supply-chain/AddMedicinePage';
import SupplyPage from '../supply-chain/SupplyPage';
import TrackPage from '../supply-chain/TrackPage';

const AppRoutes = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [currentPage, setCurrentPage] = React.useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage currentUser={currentUser} onLogout={logout} navigateTo={navigateTo} />;
      case 'roles':
        return <RolesPage currentUser={currentUser} onLogout={logout} navigateTo={navigateTo} />;
      case 'addmed':
        return <AddMedicinePage currentUser={currentUser} onLogout={logout} navigateTo={navigateTo} />;
      case 'supply':
        return <SupplyPage currentUser={currentUser} onLogout={logout} navigateTo={navigateTo} />;
      case 'track':
        return <TrackPage currentUser={currentUser} onLogout={logout} navigateTo={navigateTo} />;
      default:
        return <HomePage currentUser={currentUser} onLogout={logout} navigateTo={navigateTo} />;
    }
  };

  return renderPage();
};

export default AppRoutes;