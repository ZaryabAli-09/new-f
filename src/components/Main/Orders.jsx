// src/components/Orders.js
import React from 'react';
import Card from '../Utils/Card'; // Ensure you have a Card component
import $GS from '../../styles/constants'; // Import your styles

const Orders = () => {
  const ordersData = [
    { no: 1, type: 'Standard Delivery', from: 'Alice Johnson', to: 'Bob Brown', price: '$10.00', status: 'Completed', added: '2023-10-24' },
    { no: 2, type: 'Express Delivery', from: 'Charlie Smith', to: 'Diana Prince', price: '$20.00', status: 'Pending', added: '2023-10-25' },
    { no: 3, type: 'Next Day Delivery', from: 'Bruce Wayne', to: 'Clark Kent', price: '$30.00', status: 'Shipped', added: '2023-10-26' },
    // Add more orders as needed...
  ];

  return (
    <div className="orders-container px-4 md:px-10 py-10 md:py-20 bg-custom-background">
      <Card>
        <h2 className={`${$GS.textHeading_2} mb-4`}>Orders List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 border-custom-border">
            <thead className="bg-custom-background text-custom-text sticky top-0 z-30 border border-custom-border">
              <tr>
                <th className="border border-custom-border p-2">No</th>
                <th className="border border-custom-border p-2">Type</th>
                <th className="border border-custom-border p-2">From</th>
                <th className="border border-custom-border p-2">To</th>
                <th className="border border-custom-border p-2">Price</th>
                <th className="border border-custom-border p-2">Status</th>
                <th className="border border-custom-border p-2">Added</th>
              </tr>
            </thead>
            <tbody className="bg-custom-background text-custom-text">
              {ordersData.map(order => (
                <tr key={order.no}>
                  <td className="border border-custom-border p-2">{order.no}</td>
                  <td className="border border-custom-border p-2">{order.type}</td>
                  <td className="border border-custom-border p-2">{order.from}</td>
                  <td className="border border-custom-border p-2">{order.to}</td>
                  <td className="border border-custom-border p-2">{order.price}</td>
                  <td className="border border-custom-border p-2">{order.status}</td>
                  <td className="border border-custom-border p-2">{order.added}</td>
                </tr>
              ))}
              {/* Add more rows here if necessary */}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Orders;