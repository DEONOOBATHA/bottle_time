import React, { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Minus, Truck, Trash2, X, AlertCircle, Check } from 'lucide-react';
import { getBags, saveBag, updateBag, deleteBag } from './apiLayer/bagsApi';
import './css/BagsDisplay.css';
import { orderPickup } from './apiLayer/pickupApi';
import DeliveryModal from './DeliveryModal';

const MAX_BOTTLES = 300;

const NewBagModal = ({ isOpen, onClose, onConfirm }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numAmount = Number(amount);

    if (numAmount > MAX_BOTTLES) {
      setError(`Maximum allowed bottles is ${MAX_BOTTLES}`);
      return;
    }

    const success = await onConfirm(numAmount);
    if (success) {
      setAmount('');
      setError('');
      onClose();
    } else {
      setError('Failed to create bag. Please try again.');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        <h2>Create New Bag</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Initial Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleChange}
              min="0"
              max={MAX_BOTTLES}
              required
              placeholder="Enter number of bottles"
              className={error ? 'error' : ''}
            />
            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="confirm-btn">
              Create Bag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const BagCard = ({ id, total, onUpdate, onDelete, onDeliver, isOnDelivery }) => {
  const [showActions, setShowActions] = useState(false);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleIncrement = async () => {
    if (isUpdating || isOnDelivery) return;
    const newTotal = total + 1;
    if (newTotal > MAX_BOTTLES) {
      setError(`Cannot exceed ${MAX_BOTTLES} bottles`);
      setTimeout(() => setError(''), 3000);
      return;
    }

    setIsUpdating(true);
    const success = await onUpdate(id, newTotal);
    setIsUpdating(false);

    if (!success) {
      setError('Failed to update bag. Please try again.');
      setTimeout(() => setError(''), 3000);
    } else {
      setError('');
    }
  };

  const handleDecrement = async () => {
    if (isUpdating || total <= 0 || isOnDelivery) return;

    setIsUpdating(true);
    const success = await onUpdate(id, total - 1);
    setIsUpdating(false);

    if (!success) {
      setError('Failed to update bag. Please try again.');
      setTimeout(() => setError(''), 3000);
    } else {
      setError('');
    }
  };

  const handleDelete = async () => {
    if (isUpdating) return;

    setIsUpdating(true);
    const success = await onDelete(id);
    setIsUpdating(false);
    window.location.reload();

    if (!success) {
      setError('Failed to delete bag. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div 
      className={`bag-card ${isOnDelivery ? 'on-delivery' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {isOnDelivery && (
        <div className="delivery-status">
          <Truck size={16} />
          <span>On Hold for Delivery</span>
        </div>
      )}
      
      <div className="bag-content">
        <ShoppingBag className="bag-icon" size={64} />
        <div className="bag-controls">
          <button 
            onClick={handleDecrement} 
            className="control-btn" 
            disabled={isUpdating || total <= 0 || isOnDelivery}
          >
            <Minus size={20} />
          </button>
          <span className="bag-total">{total}</span>
          <button 
            onClick={handleIncrement} 
            className="control-btn" 
            disabled={isUpdating || isOnDelivery}
          >
            <Plus size={20} />
          </button>
        </div>
        {error && (
          <div className="error-tooltip">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>
      
      <div className={`bag-actions ${showActions ? 'visible' : ''}`}>
        {!isOnDelivery && (
          <button 
            className="action-btn deliver"
            onClick={() => {
              setShowActions(false);
              onDeliver(id);
            }}
            disabled={total === 0}
          >
            <Truck size={18} />
            <span>Deliver</span>
          </button>
        )}
        
        <button 
          className="action-btn delete" 
          onClick={handleDelete}
          disabled={isUpdating}
        >
          <Check size={18} />
          <span>{isOnDelivery ? "Order completed" : "Delete"}</span>
        </button>

        {!isOnDelivery && (
          <button 
            className="action-btn cancel"
            onClick={() => setShowActions(false)}
          >
            <X size={18} />
            <span>Cancel</span>
          </button>
        )}
      </div>
    </div>
  );
};
const BagsDisplay = () => {
  const [bags, setBags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [selectedBagId, setSelectedBagId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBags = async () => {
    const fetchedBags = await getBags();
    setBags(fetchedBags || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBags();
  }, []);

  const handleAddBag = async (initialAmount) => {
    const bagData = {
      total: initialAmount,
      isOnDelivery: false
    };
    
    const success = await saveBag(bagData);
    if (success) {
      await fetchBags();
    }
    return success;
  };

  const handleUpdateBag = async (id, newTotal) => {
    const bagData = {
      id: id,
      total: newTotal
    };
    
    const success = await updateBag(bagData);
    if (success) {
      await fetchBags();
    }
    return success;
  };

  const handleDeleteBag = async (id) => {
    const bagData = {
      id: id
    };
    
    const success = await deleteBag(bagData);
    if (success) {
      await fetchBags();
    }
    return success;
  };

  const handleOpenDelivery = (bagId) => {
    setSelectedBagId(bagId);
    setIsDeliveryModalOpen(true);
  };

  const handleCloseDelivery = () => {
    setSelectedBagId(null);
    setIsDeliveryModalOpen(false);
  };

  const handleConfirmDelivery = async (locationId) => {
    const success = await orderPickup(selectedBagId, locationId);
    if (success) {
        // Update the bag's delivery status locally until the next fetch
        setBags(prevBags => prevBags.map(bag => 
            bag.id === selectedBagId 
                ? { ...bag, isOnDelivery: true }
                : bag
        ));
        handleCloseDelivery();
    }
    return success;
};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bags-display">
      <div className="bags-header">
        <h1>My Bags</h1>
        <button onClick={() => setIsModalOpen(true)} className="add-bag-btn">
          <Plus size={24} />
          <span>New Bag</span>
        </button>
      </div>
      
      <div className="bags-grid">
        {bags.map(bag => (
          <BagCard
            key={bag.id}
            id={bag.id}
            total={bag.total}
            isOnDelivery={bag.onDelivery}
            onUpdate={handleUpdateBag}
            onDelete={handleDeleteBag}
            onDeliver={handleOpenDelivery}
          />
        ))}
      </div>

      <NewBagModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddBag}
      />

      <DeliveryModal 
        isOpen={isDeliveryModalOpen}
        onClose={handleCloseDelivery}
        onConfirm={handleConfirmDelivery}
        bagId={selectedBagId}
      />
    </div>
  );
};

export default BagsDisplay;