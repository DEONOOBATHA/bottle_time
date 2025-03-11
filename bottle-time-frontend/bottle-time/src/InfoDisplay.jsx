import React from 'react';
import { Lightbulb, PackageSearch, Timer, Users } from 'lucide-react';
import './css/InfoMission.css';

const InfoDisplay = () => {
  return (
    <div className="info-container">
      <div className="info-content">
        <h1>How It Works</h1>
        
        <div className="info-mission-statement">
          Turn your recyclable bottles into rewards with our simple, efficient collection system.
        </div>

        <div className="info-steps-grid">
          <div className="info-card">
            <PackageSearch className="info-icon" size={72} />
            <h3>Create Bags</h3>
            <p>Start by creating a new bag and adding your recyclable bottles. Each bag can hold up to 300 bottles.</p>
          </div>

          <div className="info-card">
            <Users className="info-icon" size={72} />
            <h3>Connect with Collectors</h3>
            <p>Our network of verified collectors will see your bags and arrange pickup at your convenience.</p>
          </div>

          <div className="info-card">
            <Timer className="info-icon" size={72} />
            <h3>Quick Pickup</h3>
            <p>Schedule pickups that work with your schedule. Our collectors ensure timely and efficient service.</p>
          </div>

          <div className="info-card">
            <Lightbulb className="info-icon" size={72} />
            <h3>Earn Rewards</h3>
            <p>Get rewarded for your environmental contribution. Exchange points for discounts and special offers.</p>
          </div>
        </div>

        <div className="additional-info">
          <h2>Key Features</h2>
          <ul className="features-list">
            <li>Real-time bag tracking</li>
            <li>Secure and verified collectors</li>
            <li>Instant rewards system</li>
            <li>Flexible pickup scheduling</li>
            <li>Environmental impact tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoDisplay;