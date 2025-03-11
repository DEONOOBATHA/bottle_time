
import { useNavigate } from 'react-router-dom';
import styles from './css/WelcomePage.css'

function WelcomePage() {
  const navigate = useNavigate();

  return (
    
    <div className="welcome-container">
        <div className="welcome-background">
 
  <video autoPlay muted loop>
    <source src="/video/welcome_page.mp4" type="video/mp4" />
  </video>
</div>
<div className="welcome-overlay"></div>
      <div className="welcome-content">
        <h1>Bottle-Time</h1>
        <p className="mission-statement">
          Join our mission to make the planet greener, one bottle at a time. 
          We connect eco-conscious consumers with dedicated delivery partners 
          to promote sustainable practices in beverage consumption.
        </p>
        
        <div className="features-grid">
          <div className="feature-card">
            <img src="/img/wp1.png" alt="Recycling" className="feature-icon" />
            <h3>Reduce Waste</h3>
            <p>Help eliminate single-use plastic waste through our bottle return system</p>
          </div>
          <div className="feature-card">
            <img src="/img/wp2.jpg" alt="Community" className="feature-icon" />
            <h3>Community Impact</h3>
            <p>Join a network of environmentally conscious individuals</p>
          </div>
          <div className="feature-card">
            <img src="/img/wp3.jpg" alt="Delivery" className="feature-icon" />
            <h3>Easy Delivery</h3>
            <p>Convenient doorstep delivery and pickup of bottles</p>
          </div>
        </div>

        <div className="auth-buttons">
          <div className="auth-column">
            <h2>For Customers</h2>
            <button 
              className="auth-btn register-btn"
              onClick={() => navigate('/user/register')}
            >
              Register as Customer
            </button>
            <button 
              className="auth-btn login-btn"
              onClick={() => navigate('/user/login')}
            >
              Login as Customer
            </button>
          </div>
          <div className="auth-column">
            <h2>For Deliverers</h2>
            <button 
              className="auth-btn register-btn"
              onClick={() => navigate('/deliverer/register')}
            >
              Register as Deliverer
            </button>
            <button 
              className="auth-btn login-btn"
              onClick={() => navigate('/deliverer/login')}
            >
              Login as Deliverer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;