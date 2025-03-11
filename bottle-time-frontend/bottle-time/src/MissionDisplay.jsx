import React from 'react';
import { Leaf, Recycle, TreePine, Droplet } from 'lucide-react';
import './css/InfoMission.css';

const MissionDisplay = () => {
  return (
    <div className="mission-container">
      <div className="mission-content">
        <h1>Our Green Mission</h1>
        
        <div className="mission-statement">
          Together, we're building a sustainable future by revolutionizing bottle recycling and reducing plastic waste.
        </div>

        <div className="impact-statistics">
          <div className="stat-card">
            <h3>8 Million</h3>
            <p>Tons of plastic enter our oceans every year</p>
          </div>
          <div className="stat-card">
            <h3>91%</h3>
            <p>Of plastic is not recycled</p>
          </div>
          <div className="stat-card">
            <h3>450 Years</h3>
            <p>Average time for a plastic bottle to decompose</p>
          </div>
        </div>

        <div className="mission-sections">
          <div className="mission-section">
            <div className="section-header">
              <Recycle className="section-icon" size={32} />
              <h2>The Recycling Impact</h2>
            </div>
            <p>Recycling one plastic bottle saves enough energy to power a 60-watt light bulb for 6 hours. By participating in our program, you're directly contributing to energy conservation and waste reduction.</p>
          </div>

          <div className="mission-section">
            <div className="section-header">
              <TreePine className="section-icon" size={32} />
              <h2>Environmental Benefits</h2>
            </div>
            <p>Every ton of recycled plastic saves 5,774 kWh of energy, 16.3 barrels of oil, 98 million BTUs of energy, and 30 cubic yards of landfill space.</p>
          </div>

          <div className="mission-section">
            <div className="section-header">
            <Droplet className="section-icon" size={32} />
              <h2>Water Conservation</h2>
            </div>
            <p>The plastic bottle manufacturing process requires up to 6 times the amount of water contained in the bottle. By recycling, we reduce water waste and protect our water resources.</p>
          </div>

          <div className="mission-section">
            <div className="section-header">
              <Leaf className="section-icon" size={32} />
              <h2>Join Our Mission</h2>
            </div>
            <p>Every bottle recycled is one less in our oceans and landfills. Join our community of environmental champions and make a real difference in the fight against plastic pollution.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionDisplay;