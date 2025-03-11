import { Navigate } from 'react-router-dom';

const ProtectedLogin = ({ isNotAuthenticated, children }) => {

    if (isNotAuthenticated) {
        return children;
    }
    return <Navigate to="/homepage" />;
};

export default ProtectedLogin;