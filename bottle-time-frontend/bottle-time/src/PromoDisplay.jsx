import React, { useState, useEffect } from 'react';
import { getMyPromos, buyPromo } from './apiLayer/promosApi';
import { Store, AlertCircle, Coins } from 'lucide-react';
import './css/Promos.css';

const PromoCard = ({ promo, onBuySuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBuy = async () => {
    setIsLoading(true);
    setError(null);

    const response = await buyPromo({
      id: promo.id,
      price: promo.price
    });

    if (response.success) {
      onBuySuccess();
    } else {
      setError(response.error);
      setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
    }

    setIsLoading(false);
  };

  return (
    <div className="promo-card">
      <div className="promo-image">
        <img src={promo.imgUrl || "/img/offer_placeholder.jpg"} alt={promo.storeName} />
      </div>
      <div className="promo-content">
        <div className="promo-header">
          <Store className="store-icon" size={24} />
          <h3>{promo.storeName}</h3>
        </div>
        <div className="promo-price">
          <span className="currency"><Coins size={12}/> BT</span>
          <span className="amount">{promo.price}</span>
        </div>
        <p className="promo-description">{promo.description}</p>
        {error && (
          <div className="buy-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        <button 
          className={`buy-button ${isLoading ? 'loading' : ''} ${error ? 'error' : ''}`} 
          onClick={handleBuy}
          disabled={isLoading}
        >
          <Coins size={20} />
          <span>{isLoading ? 'Processing...' : 'Buy'}</span>
        </button>
      </div>
    </div>
  );
};

const PromosDisplay = () => {
  const [promos, setPromos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPromos = async () => {
    try {
      const data = await getMyPromos();
      setPromos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load promotions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const handleBuySuccess = () => {
    // Refresh promos list after successful purchase
    fetchPromos();
  };

  if (isLoading) {
    return <div className="promos-loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="promos-error">
        <AlertCircle size={24} />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="promos-display">
      <div className="promos-header">
        <h1>Available Promotions</h1>
      </div>
      
      {promos.length === 0 ? (
        <div className="no-promos">
          <p>No promotions available at this time.</p>
        </div>
      ) : (
        <div className="promos-grid">
          {promos.map(promo => (
            <PromoCard 
              key={promo.id} 
              promo={promo}
              onBuySuccess={handleBuySuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PromosDisplay;