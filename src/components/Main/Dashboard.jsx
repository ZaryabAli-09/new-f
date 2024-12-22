// src/components/Main/Dashboard.js
import React from 'react';
import { FaDollarSign, FaArrowUp, FaFileAlt, FaShoppingCart } from 'react-icons/fa'; // Importing icons
import Card from '../Utils/Card'; // Ensure you have a Card component
import $GS from '../../styles/constants'; // Import your styles

const Dashboard = () => {
  // Placeholder data for demonstration
  const mockData = {
    balance: 5000,
    totalDeposited: 2000,
    totalOrders: 15,
    totalSpent: 1200,
    recentOrders: [
      { type: 'Order 1', from: 'User A', to: 'Service X', status: 'Completed' },
      { type: 'Order 2', from: 'User B', to: 'Service Y', status: 'Pending' },
    ],
    recentDeposits: [
      { amount: 500, date: '2023-10-01' },
      { amount: 800, date: '2023-09-28' },
    ],
  };

  return (
    <div className="px-4 md:px-10 py-10 md:py-20 bg-custom-background">

      {/* Row for Balance, Total Deposited, Total Orders, and Total Spent */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        <Card>
          <div className="flex items-center">
            <FaDollarSign className={`${$GS.iconSize} text-custom-border mr-2`} />
            <div>
              <h3 className={`${$GS.textHeading_3}`}>Balance</h3>
              <p className={`${$GS.textNormal_1}`}>${mockData.balance}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <FaArrowUp className={`${$GS.iconSize} text-custom-border mr-2`} />
            <div>
              <h3 className={`${$GS.textHeading_3}`}>Total Deposited</h3>
              <p className={`${$GS.textNormal_1}`}>${mockData.totalDeposited}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <FaShoppingCart className={`${$GS.iconSize} text-custom-border mr-2`} />
            <div>
              <h3 className={`${$GS.textHeading_3}`}>Total Orders</h3>
              <p className={`${$GS.textNormal_1}`}>{mockData.totalOrders}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <FaFileAlt className={`${$GS.iconSize} text-custom-border mr-2`} />
            <div>
              <h3 className={`${$GS.textHeading_3}`}>Total Spent</h3>
              <p className={`${$GS.textNormal_1}`}>${mockData.totalSpent}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Orders and Recent Deposits in cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recent Orders Card */}
          <Card className="col-span-2 bg-custom-background">
            <h2 className={`${$GS.textHeading_2} mb-4`}>Recent Orders</h2>
            <table className="min-w-full bg-transparent border border-custom-border">
              <thead>
                <tr className="bg-custom-background text-white text-left">
                  <th className="px-4 py-2 border-b border-custom-border">Type</th>
                  <th className="px-4 py-2 border-b border-custom-border">From</th>
                  <th className="px-4 py-2 border-b border-custom-border">To</th>
                  <th className="px-4 py-2 border-b border-custom-border">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockData.recentOrders.map((order, index) => (
                  <tr key={index} className="hover:border-hover-border">
                    <td className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}>{order.type}</td>
                    <td className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}>{order.from}</td>
                    <td className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}>{order.to}</td>
                    <td className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Recent Deposits Card */}
          <Card className="bg-custom-background">
            <h2 className={`${$GS.textHeading_2} mb-4`}>Recent Deposits</h2>
            <table className="min-w-full bg-transparent border border-custom-border">
              <thead>
                <tr className="bg-custom-background text-white text-left">
                  <th className="px-4 py-2 border-b border-custom-border">Amount</th>
                  <th className="px-4 py-2 border-b border-custom-border">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockData.recentDeposits.map((deposit, index) => (
                  <tr key={index} className="hover:bborder-hover-border">
                    <td className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}>${deposit.amount}</td>
                    <td className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}>{deposit.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
      </div>
    </div>
  );
};

export default Dashboard;