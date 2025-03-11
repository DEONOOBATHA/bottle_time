import React, { useState, useEffect } from 'react';
import { MapPin, X, AlertCircle, Truck, Loader } from 'lucide-react';
import { getLocations } from './apiLayer/mapsApi';
import './css/DeliveryModal.css';
import { orderPickup } from './apiLayer/pickupApi';

const DeliveryModal = ({ isOpen, onClose, bagId }) => {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isOrdering, setIsOrdering] = useState(false);

    useEffect(() => {
        const fetchLocations = async () => {
            setIsLoading(true);
            const fetchedLocations = await getLocations();
            setLocations(fetchedLocations || []);
            setIsLoading(false);
        };

        if (isOpen) {
            fetchLocations();
        }
    }, [isOpen]);

    const handleOrderDelivery = async () => {
        if (!selectedLocation) {
            setError('Please select a delivery location');
            return;
        }

        setIsOrdering(true);
        const success = await orderPickup(bagId, selectedLocation.id);
        setIsOrdering(false);

        if (success) {
            onClose();
            window.location.reload();
        } else {
            setError('Failed to order pickup. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="delivery-modal">
                <div className="modal-header">
                    <h2>Order Pickup</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-content">
                    <div className="location-selection">
                        <h3>Select Pickup Location</h3>
                        {isLoading ? (
                            <div className="loading-state">
                                <Loader className="spin" size={24} />
                                <span>Loading locations...</span>
                            </div>
                        ) : locations.length === 0 ? (
                            <div className="empty-state">
                                No saved locations available. Please add a location first.
                            </div>
                        ) : (
                            <div className="locations-grid">
                                {locations.map((location) => (
                                    <div
                                        key={location.id}
                                        className={`location-option ${selectedLocation?.id === location.id ? 'selected' : ''}`}
                                        onClick={() => {
                                            setSelectedLocation(location);
                                            setError('');
                                        }}
                                    >
                                        <div className="location-option-content">
                                            <span className="location-name">{location.name}</span>
                                            <span className="coordinates">
                                                <MapPin size={16} />
                                                {`(${location.x.toFixed(4)}, ${location.y.toFixed(4)})`}
                                            </span>
                                        </div>
                                        <div className="selection-indicator"></div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {error && (
                            <div className="error-message">
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={onClose} disabled={isOrdering}>
                        Cancel
                    </button>
                    <button 
                        className="order-btn"
                        onClick={handleOrderDelivery}
                        disabled={!selectedLocation || isOrdering}
                    >
                        {isOrdering ? (
                            <>
                                <Loader className="spin" size={18} />
                                <span>Ordering...</span>
                            </>
                        ) : (
                            <>
                                <Truck size={18} />
                                <span>Order Pickup</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryModal;