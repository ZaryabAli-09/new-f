// src/components/Main/AdminPanel.js
import React from 'react';
import { FaUsers, FaClipboardList, FaCogs, FaChartBar, FaEdit, FaTrash } from 'react-icons/fa'; // Include new icons
import Card from '../Utils/Card'; // Ensure you have a Card component
import $GS from '../../styles/constants'; // Import your styles

const AdminPanel = () => {
  // Placeholder data for demonstration
  const mockData = {
    totalUsers: 120,
    totalOrders: 350,
    totalServices: 25,
    recentActivities: [
      { type: 'User Registration', user: 'User A', date: '2023-10-01' },
      { type: 'Service Added', service: 'Service Y', date: '2023-09-25' },
      { type: 'Order Completed', orderId: 'Order 102', date: '2023-09-23' },
    ],
    users: [
      { id: 1, name: 'User A', email: 'usera@example.com', status: 'Active', role: 'Admin' },
      { id: 2, name: 'User B', email: 'userb@example.com', status: 'Inactive', role: 'User' },
      { id: 3, name: 'User C', email: 'userc@example.com', status: 'Active', role: 'Moderator' },
    ],
  };

  // Function to simulate activating/deactivating a user
  const toggleUserStatus = (userId) => {
    console.log(`Toggled status for user with ID: ${userId}`);
    // Here you would implement the logic to update the user status
  };

  // Function to simulate changing the user role
  const changeUserRole = (userId) => {
    console.log(`Changing role for user with ID: ${userId}`);
    // Here you would implement the logic to change the user's role
  };

  return (
    <div className="px-4 md:px-10 py-10 md:py-20 bg-custom-background">

      {/* Row for Total Users, Total Orders, Total Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        <Card>
          <div className="flex items-center">
            <FaUsers className={`${$GS.iconSize} text-custom-border mr-2`} />
            <div>
              <h3 className={`${$GS.textHeading_3}`}>Total Users</h3>
              <p className={`${$GS.textNormal_1}`}>{mockData.totalUsers}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <FaClipboardList className={`${$GS.iconSize} text-custom-border mr-2`} />
            <div>
              <h3 className={`${$GS.textHeading_3}`}>Total Orders</h3>
              <p className={`${$GS.textNormal_1}`}>{mockData.totalOrders}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <FaCogs className={`${$GS.iconSize} text-custom-border mr-2`} />
            <div>
              <h3 className={`${$GS.textHeading_3}`}>Total Services</h3>
              <p className={`${$GS.textNormal_1}`}>{mockData.totalServices}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activities Section */}
      <Card>
        <h2 className={`${$GS.textHeading_2} mb-4`}>Recent Activities</h2>
        <table className="min-w-full bg-transparent border border-custom-border">
          <thead>
            <tr className="bg-custom-background text-white text-left">
              <th className="px-4 py-2 border-b border-custom-border">Type</th>
              <th className="px-4 py-2 border-b border-custom-border">User/Service</th>
              <th className="px-4 py-2 border-b border-custom-border">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockData.recentActivities.map((activity, index) => (
              <tr key={index} className="hover:border-hover-border">
                <td className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}>{activity.type}</td>
                <td className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}>
                  {activity.user || activity.service || activity.orderId}
                </td>
                <td className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}>{activity.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* User Management Section */}
      <Card className="mt-10">
        <h2 className={`${$GS.textHeading_2} mb-4`}>User Management</h2>
        <table className="min-w-full bg-transparent border border-custom-border">
          <thead>
            <tr className="bg-custom-background text-white text-left">
              <th className="px-4 py-2 border-b border-custom-border">ID</th>
              <th className="px-4 py-2 border-b border-custom-border">Name</th>
              <th className="px-4 py-2 border-b border-custom-border">Email</th>
              <th className="px-4 py-2 border-b border-custom-border">Status</th>
              <th className="px-4 py-2 border-b border-custom-border">Role</th>
              <th className="px-4 py-2 border-b border-custom-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockData.users.map((user) => (
              <tr key={user.id} className="hover:border-hover-border">
                <td className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}>{user.id}</td>
                <td className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}>{user.name}</td>
                <td className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}>{user.email}</td>
                <td className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}>{user.status}</td>
                <td className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}>
                  <select 
                    value={user.role} 
                    onChange={() => changeUserRole(user.id)} 
                    className="bg-white text-black border border-custom-border p-1"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                    <option value="User">User</option>
                  </select>
                </td>
                <td className={`border-b border-custom-border px-4 py-2`}>
                  <button 
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AdminPanel;