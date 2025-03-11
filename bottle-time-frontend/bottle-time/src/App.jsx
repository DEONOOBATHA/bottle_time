import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authCheck, checkDelivererStatus } from './apiLayer/authApi.js'
import Layout from './Layout';
import WelcomePage from './WelcomePage';
import DelivererLogin from './DelivererLogin';
import DelivererRegister from './DelivererRegister';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';
import ProtectedRoute from './ProtectedRoute';
import ProtectedLogin from './ProtectedLogin.jsx';
import Homepage from './Homepage.jsx';
import PromosDisplay from './PromoDisplay.jsx';
import InfoDisplay from './InfoDisplay.jsx';
import MissionDisplay from './MissionDisplay.jsx';
import MapsDisplay from './MapsDisplay.jsx';
import ActiveOffersDisplay from './ActiveOffersDisplay.jsx';
import DelivererDashboard from './DelivererDashboard';
import styles from './css/App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDeliverer, setIsDeliverer] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const authStatus = await authCheck();
      setIsAuthenticated(authStatus);
      
      if (authStatus) {
        const delivererStatus = await checkDelivererStatus();
        setIsDeliverer(delivererStatus);
        console.log(delivererStatus);
      } else {
        setIsDeliverer(false);
      }
    } catch (error) {
      console.error('Verification error:', error);
      setIsAuthenticated(false);
      setIsDeliverer(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Redirect deliverers to /deliver if they're on any other authenticated route
  useEffect(() => {
    if (isDeliverer && isAuthenticated && window.location.hash !== '#/deliver') {
      window.location.hash = '#/deliver';
    }
  }, [isDeliverer, isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <HashRouter>
      <Routes>
        {/* Redirect root based on auth and deliverer status */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              (isDeliverer ? 
                <Navigate to="/deliver" replace /> : 
                <Navigate to="/homepage" replace />) : 
              <Navigate to="/welcome" replace />
          } 
        />

        {/* Public routes (only accessible when not authenticated) */}
        <Route 
          path="/welcome" 
          element={
            <ProtectedLogin isNotAuthenticated={!isAuthenticated}>
              <WelcomePage />
            </ProtectedLogin>
          } 
        />
        <Route 
          path="/user/register" 
          element={
            <ProtectedLogin isNotAuthenticated={!isAuthenticated}>
              <UserRegister />
            </ProtectedLogin>
          } 
        />
        <Route 
          path="/deliverer/register" 
          element={
            <ProtectedLogin isNotAuthenticated={!isAuthenticated}>
              <DelivererRegister />
            </ProtectedLogin>
          } 
        />
        <Route 
          path="/user/login" 
          element={
            <ProtectedLogin isNotAuthenticated={!isAuthenticated}>
              <UserLogin onLoginSuccess={checkAuthStatus} />
            </ProtectedLogin>
          } 
        />
        <Route 
          path="/deliverer/login" 
          element={
            <ProtectedLogin isNotAuthenticated={!isAuthenticated}>
              <DelivererLogin onLoginSuccess={checkAuthStatus} />
            </ProtectedLogin>
          } 
        />

        {/* Deliverer routes */}
        <Route 
          path="/deliver" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {isDeliverer ? 
                <DelivererDashboard /> : 
                <Navigate to="/homepage" replace />
              }
            </ProtectedRoute>
          } 
        />

        {/* Regular user routes */}
        <Route 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {isDeliverer ? 
                <Navigate to="/deliver" replace /> :
                <Layout />
              }
            </ProtectedRoute>
          }
        >
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/promos" element={<PromosDisplay />} />
          <Route path="/info" element={<InfoDisplay/>}/>
          <Route path="/mission" element={<MissionDisplay/>}/>
          <Route path="/maps" element={<MapsDisplay/>}/>
          <Route path="/active-offers" element={<ActiveOffersDisplay />} />
        </Route>

        {/* Catch-all route for 404 */}
        <Route path="*" element={<>Not Found</>} />
      </Routes>
    </HashRouter>
  );
}

export default App;


