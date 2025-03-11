import React, { useState, useEffect } from 'react';
import { getActiveOffers } from './apiLayer/activeOffersApi';
import { Store, AlertCircle, QrCode } from 'lucide-react';
import './css/ActiveOffersDisplay.css';

const OfferCard = ({ offer }) => {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="active-offer-card">
      <div className="offer-content">
        <div className="offer-header">
          <Store className="store-icon" size={24} />
          <h3>{offer.promo.storeName}</h3>
        </div>
        
        
        <p className="offer-description">{offer.promo.description}</p>
        
        <button 
          className="qr-button"
          onClick={() => setShowQR(!showQR)}
        >
          <QrCode size={20} />
          <span>{showQR ? 'Hide QR Code' : 'Show QR Code'}</span>
        </button>

        {showQR && (
          <div className="qr-container">
            <img src={offer.qrImgUrl} alt="QR Code" className="qr-code" />
          </div>
        )}
      </div>
    </div>
  );
};

const ActiveOffersDisplay = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getActiveOffers();
        setOffers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load active offers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (isLoading) {
    return <div className="offers-loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="offers-error">
        <AlertCircle size={24} />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="active-offers-display">
      <div className="offers-header">
        <h1>My Active Offers</h1>
      </div>
      
      {offers.length === 0 ? (
        <div className="no-offers">
          <p>No active offers at this time.</p>
        </div>
      ) : (
        <div className="offers-grid">
          {offers.map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveOffersDisplay;