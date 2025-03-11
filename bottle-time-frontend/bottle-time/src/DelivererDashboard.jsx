// DelivererDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Package, Calendar, User, Loader, AlertCircle , LogOut} from 'lucide-react';
import { getActiveOrders, acceptOrder } from './apiLayer/delivererApi';
import './css/DelivererDashboard.css';
import {logout} from './apiLayer/authApi.js'

const OrderDetailsCard = ({ order, onAccept, isAccepting }) => {
    const formattedDate = new Date(order.date.replace('_', ' ')).toLocaleString();

    return (
        <div className="order-details-card">
            <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className="date">
                    <Calendar size={16} />
                    {formattedDate}
                </span>
            </div>
            
            <div className="order-info">
                <div className="info-row">
                    <Package size={16} />
                    <span>{order.totalBottles} bottles</span>
                </div>
                <div className="info-row">
                    <MapPin size={16} />
                    <span>{order.location.name}</span>
                </div>
                <div className="coordinates">
                    {`(${order.location.x.toFixed(4)}, ${order.location.y.toFixed(4)})`}
                </div>
            </div>

            <button 
                className="accept-btn" 
                onClick={() => onAccept(order.id)}
                disabled={isAccepting}
            >
                {isAccepting ? (
                    <>
                        <Loader className="spin" size={16} />
                        <span>Accepting...</span>
                    </>
                ) : (
                    <span>Accept Order</span>
                )}
            </button>
        </div>
    );
};

const DelivererDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAccepting, setIsAccepting] = useState(false);
    const mapRef = useRef(null);

    const fetchOrders = async () => {
        setIsLoading(true);
        const fetchedOrders = await getActiveOrders();
        setOrders(fetchedOrders);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 30000); // Refresh every 30 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const initMap = async () => {
            if (!window.google || !mapRef.current) return;

            // Get user's current position
            let initialLocation = { lat: 46.7712, lng: 23.6236 }; 
            
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

            // Add markers for orders
            const newMarkers = orders.map(order => {
                const pinElement = document.createElement('div');
                pinElement.className = 'custom-marker order-marker';
                pinElement.innerHTML = `
                    <div class="marker-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#1565C0"/>
                            <path d="M12 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="white"/>
                        </svg>
                        <span class="marker-label">${order.totalBottles}</span>
                    </div>
                `;

                const marker = new window.google.maps.marker.AdvancedMarkerElement({
                    map: mapInstance,
                    position: { lat: order.location.x, lng: order.location.y },
                    content: pinElement,
                    title: `Order #${order.id}`
                });

                marker.addListener('click', () => {
                    setSelectedOrder(order);
                });

                return marker;
            });

            setMarkers(newMarkers);
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
            markers.forEach(marker => {
                if (marker) marker.map = null;
            });
        };
    }, [orders]);

    const handleAcceptOrder = async (orderId) => {
        setIsAccepting(true);
        const success = await acceptOrder(orderId);
        setIsAccepting(false);

        if (success) {
            window.location.reload();
        } else {
            setError('Failed to accept order. Please try again.');
            setTimeout(() => setError(''), 3000);
        }
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <Loader className="spin" size={32} />
                <span>Loading orders...</span>
            </div>
        );
    }

    return (
        <div className="deliverer-dashboard">
           <div className="dashboard-header">
    <div className="header-content">
        <h1>Active Orders</h1>
        <button className="logout-btn" onClick={async () => {
            const success = await logout();
            if (success) {
                window.location.href = '/login';
            } else {
                setError('Failed to logout. Please try again.');
                setTimeout(() => setError(''), 3000);
            }
        }}>
            <LogOut size={18} />
            <span>Logout</span>
        </button>
    </div>
    {error && (
        <div className="error-message">
            <AlertCircle size={18} />
            <span>{error}</span>
        </div>
    )}
</div>

            <div className="dashboard-content">
                <div className="map-container" ref={mapRef} />
                
                {selectedOrder && (
                    <OrderDetailsCard 
                        order={selectedOrder}
                        onAccept={handleAcceptOrder}
                        isAccepting={isAccepting}
                    />
                )}
            </div>
        </div>
    );
};

export default DelivererDashboard;
