import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Map, Tag, ShoppingBag, Gift, LogOut, InfoIcon, CircleArrowRight, Coins } from 'lucide-react';
import './css/Sidepanel.css';
import { fetchMyUser } from './apiLayer/userApi';
import { logout } from './apiLayer/authApi';
import {useState, useEffect} from 'react'

function Sidepanel() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const success = await logout();
    if (success) {
        window.location.replace("/")
    } else {
        console.error('Logout failed');
        alert('Logout failed. Please try again.');
    }
};
  const [profileData, setProfileData] = useState({
    username: 'JohnDoe',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNr: '000000000',
    balance: -1,
    deliverer: false,
    imgUrl: 'img/wp2.jpg',
    reportNumber: -1
  });

  useEffect(() => {
    const getMyUser = async () => {
      try {
        const data = await fetchMyUser();
        setProfileData({
          username: data.username,
          name: data.name, 
          email: data.email,
          phoneNr: data.phoneNr,
          balance: data.balance,
          deliverer: data.deliverer,
          imgUrl: data.imgUrl,
          reportNumber: data.reportNumber
        });
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    };
    getMyUser();
  }, []);

  return (
    <div className="sidepanel">
      <div className="profile-section">
        <div className="profile-image">
          <img 
            src={profileData.imgUrl || "/img/wp2.jpg"}
            alt="Profile" 
          />
        </div>
        <h3 className="profile-name">{profileData.username}</h3>
        <p className="profile-status">{profileData.email}</p>
        <br/>
        <p className="profile-status-balance">Balance  <Coins size={12} />: {" " + profileData.balance} BT</p>
        <br/>
        <p className="profile-status">Phone Number: {profileData.phoneNr}</p>
        <p className="profile-status">Reports: {profileData.reportNumber}</p>
      </div>

      <nav className="nav-menu">
      <Link to = "/homepage">
        <button className="nav-button">
          <ShoppingBag className="nav-icon" />
          <span>Sell</span>
        </button>
      </Link>

      <Link to = "/maps">
        <button className="nav-button">
          <Map className="nav-icon" />
          <span>Maps</span>
        </button>
      </Link>


      <Link to = "/active-offers">
        <button className="nav-button">
          <Tag className="nav-icon" />
          <span>Active offers</span>
        </button>
      </Link>
        <Link to = "/promos">
        <button className="nav-button">
          <Gift className="nav-icon" />
          <span>Promo</span>
        </button>
        </Link>

        <Link to = "/info">
        <button className="nav-button">
          <InfoIcon className="nav-icon" />
          <span>Info</span>
        </button>
        </Link>


        <Link to = "/mission">
        <button className="nav-button">
          <CircleArrowRight className="nav-icon" />
          <span>Mission</span>
        </button>
        </Link>

        <button 
          onClick={handleLogout}
          className="nav-button logout"
        >
          <LogOut className="nav-icon" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}

export default Sidepanel;