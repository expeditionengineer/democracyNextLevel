import { Navigate, Route } from 'react-router-dom';
import Dashboard from './Dashboard'; // Import your Dashboard component

function ProtectedRoute() {
    const token = localStorage.getItem('token');

    return (
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" replace />} />
    );
}

export default ProtectedRoute;