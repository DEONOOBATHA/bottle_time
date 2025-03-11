// MapsDisplay.jsx
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Save, AlertCircle, Trash2, Loader, X } from 'lucide-react';
import { saveLocation, getLocations } from './apiLayer/mapsApi';
import './css/MapsDisplay.css';

const LocationNameModal = ({ isOpen, onClose, onSave, isLoading }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Please enter a location name');
            return;
        }
        onSave(name.trim());
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Name Your Location</h3>
                    <button className="close-button" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="locationName">Location Name</label>
                        <input
                            id="locationName"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter a name for this location"
                            autoFocus
                        />
                        {error && (
                            <div className="form-error">
                                <AlertCircle size={14} />
                                <span>{error}</span>
                            </div>
                        )}
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="save-btn" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const MapsDisplay = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [savedLocations, setSavedLocations] = useState([]);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingLocations, setIsLoadingLocations] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const mapRef = useRef(null);

    const fetchLocations = async () => {
        setIsLoadingLocations(true);
        const locations = await getLocations();
        setSavedLocations(locations);
        setIsLoadingLocations(false);
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    useEffect(() => {
        // Initialize Google Maps
        const initMap = async () => {
            if (!window.google || !mapRef.current) return;

            // Get user's current position
            let initialLocation = { lat: 40.7128, lng: -74.0060 }; // Default to NYC if geolocation fails
            
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    });
                });
                
                initialLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            } catch (error) {
                console.warn('Geolocation failed:', error);
                // Continue with default location
            }

            const mapInstance = new window.google.maps.Map(mapRef.current, {
                zoom: 13,
                center: initialLocation,
                mapId: '8e0a97af9386fef',
                styles: [
                    {
                        featureType: "all",
                        elementType: "geometry",
                        stylers: [{ color: "#C8E6C9" }]
                    },
                    {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{ color: "#E8F5E9" }]
                    },
                    {
                        featureType: "road",
                        elementType: "geometry",
                        stylers: [{ color: "#2E7D32" }]
                    }
                ]
            });

            setMap(mapInstance);

            // Add click listener to map
            mapInstance.addListener('click', (e) => {
                const location = {
                    x: e.latLng.lat(),
                    y: e.latLng.lng(),
                    position: e.latLng
                };

                if (marker) {
                    marker.map = null;
                }

                const pinElement = document.createElement('div');
                pinElement.className = 'custom-marker';
                pinElement.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#2E7D32"/>
                        <path d="M12 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="white"/>
                    </svg>
                `;

                const newMarker = new window.google.maps.marker.AdvancedMarkerElement({
                    map: mapInstance,
                    position: e.latLng,
                    content: pinElement,
                    title: 'Selected Location'
                });

                setMarker(newMarker);
                setSelectedLocation(location);
            });

            // Add markers for saved locations
            savedLocations.forEach(location => {
                const pinElement = document.createElement('div');
                pinElement.className = 'custom-marker saved-marker';
                pinElement.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#1565C0"/>
                        <path d="M12 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="white"/>
                    </svg>
                `;

                new window.google.maps.marker.AdvancedMarkerElement({
                    map: mapInstance,
                    position: { lat: location.x, lng: location.y },
                    content: pinElement,
                    title: location.name
                });
            });
        };

        if (!window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=no_key&libraries=marker`;
            script.onload = initMap;
            document.head.appendChild(script);
        } else {
            initMap();
        }

        return () => {
            if (marker) {
                marker.map = null;
            }
        };
    }, [savedLocations]);

    const handleSaveLocation = async () => {
        if (!selectedLocation) {
            setError('Please select a location on the map');
            setTimeout(() => setError(''), 3000);
            return;
        }
        setIsModalOpen(true);
    };

    const handleSaveWithName = async (name) => {
        setIsLoading(true);
        const locationWithName = {
            ...selectedLocation,
            name
        };
        
        const success = await saveLocation(locationWithName);
        setIsLoading(false);

        if (!success) {
            setError('Failed to save location. Please try again.');
            setTimeout(() => setError(''), 3000);
        } else {
            setError('');
            if (marker) {
                marker.map = null;
                setMarker(null);
            }
            setSelectedLocation(null);
            setIsModalOpen(false);
            fetchLocations();
        }
    };

    const handleDeleteLocation = () => {
        if (marker) {
            marker.map = null;
            setMarker(null);
        }
        setSelectedLocation(null);
    };

    return (
        <div className="maps-container">
            <div className="locations-sidebar">
                <h2>Saved Locations</h2>
                <div className="locations-list">
                    {isLoadingLocations ? (
                        <div className="loading-state">
                            <Loader className="spin" size={24} />
                            <span>Loading locations...</span>
                        </div>
                    ) : savedLocations.length === 0 ? (
                        <div className="empty-state">
                            No locations saved yet
                        </div>
                    ) : (
                        savedLocations.map((location, index) => (
                            <div key={index} className="location-item saved">
                                <div className="location-info">
                                    <span className="location-name">{location.name}</span>
                                    <span className="coordinates">
                                        <MapPin size={18} />
                                        {`(${location.x.toFixed(4)}, ${location.y.toFixed(4)})`}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="maps-display">
                <div className="maps-header">
                    <h1>Location Selection</h1>
                    {selectedLocation && (
                        <div className="location-item">
                            <span className="coordinates">
                                <MapPin size={18} />
                                {`(${selectedLocation.x.toFixed(4)}, ${selectedLocation.y.toFixed(4)})`}
                            </span>
                            <button 
                                className="delete-location-btn"
                                onClick={handleDeleteLocation}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="map-container" ref={mapRef} />

                {error && (
                    <div className="error-message">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <div className="actions-container">
                    <button 
                        className={`save-location-btn ${!selectedLocation ? 'disabled' : ''}`}
                        onClick={handleSaveLocation}
                        disabled={!selectedLocation || isLoading}
                    >
                        <Save size={20} />
                        <span>{isLoading ? 'Saving...' : 'Save Location'}</span>
                    </button>
                </div>

                <LocationNameModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveWithName}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default MapsDisplay;
