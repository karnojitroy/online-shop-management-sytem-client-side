import React from 'react';
import useAuth from '../../../hooks/useAuth';
import AdminDashboard from '../AdminDashboard/AdminDashboard/AdminDashboard';
import CustomerDashboard from '../CustomerDashboard/CustomerDashboard/CustomerDashboard';


const Dashboard = () => {
    const { admin } = useAuth();
    // Main Dashboard, has two part , one for admin and another for customer
    return (
        <div>
            {admin ? <AdminDashboard /> :
                <CustomerDashboard />
            }
        </div>
    );
};

export default Dashboard;