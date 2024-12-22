// src/components/Admin/Dashboard.js
import React from "react";
import { FaUsers, FaCog, FaClipboardList, FaMoneyBill } from "react-icons/fa"; // Import the necessary icons
import Card from "../Utils/Card.jsx"; // Import the Card component
import $GS from "../../styles/constants"; // Import your styles

const Dashboard = () => {
  // Placeholder data for admin demonstration
  const mockData = {
    totalUsers: 150,
    totalOrders: 90,
    totalRevenue: 25000,
    totalPendingOrders: 5,
  };

  return (
    <div className="px-4 md:px-10 py-10 md:py-20 bg-custom-background">
      {/* Row for Total Users, Total Orders, Total Revenue, and Total Pending Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
            <FaClipboardList
              className={`${$GS.iconSize} text-custom-border mr-2`}
            />
            <div>
              <h3 className={`${$GS.textHeading_3}`}>Total Orders</h3>
              <p className={`${$GS.textNormal_1}`}>{mockData.totalOrders}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <FaMoneyBill
              className={`${$GS.iconSize} text-custom-border mr-2`}
            />
            <div>
              <h3 className={`${$GS.textHeading_3}`}>Total Revenue</h3>
              <p className={`${$GS.textNormal_1}`}>${mockData.totalRevenue}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <FaCog className={`${$GS.iconSize} text-custom-border mr-2`} />
            <div>
              <h3 className={`${$GS.textHeading_3}`}>Pending Orders</h3>
              <p className={`${$GS.textNormal_1}`}>
                {mockData.totalPendingOrders}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Further sections for admin */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Admin actions or recent activities can be added here */}
        <Card className="col-span-full bg-custom-background">
          <h2 className={`${$GS.textHeading_2} mb-4`}>Admin Actions</h2>
          <p className={`${$GS.textNormal_1}`}>
            Manage users, oversee orders, and adjust settings.
          </p>
          {/* Insert any functional components / links here */}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
