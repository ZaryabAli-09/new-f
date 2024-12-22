// src/components/BatchOrders.js
import React, { useState } from 'react';
import Card from '../Utils/Card'; // Ensure you have a Card component
import $GS from '../../styles/constants'; // Import your styles

const BatchOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const batchOrdersData = [
    { no: 1, type: 'Batch A', labelsSubmitted: 100, labelsGenerated: 90, price: '$150.00', status: 'Completed' },
    { no: 2, type: 'Batch B', labelsSubmitted: 200, labelsGenerated: 180, price: '$300.00', status: 'Shipped' },
    { no: 3, type: 'Batch C', labelsSubmitted: 150, labelsGenerated: 150, price: '$250.00', status: 'Completed' },
    { no: 4, type: 'Batch D', labelsSubmitted: 300, labelsGenerated: 250, price: '$450.00', status: 'Pending' },
    { no: 5, type: 'Batch E', labelsSubmitted: 400, labelsGenerated: 390, price: '$600.00', status: 'Completed' },
    { no: 6, type: 'Batch F', labelsSubmitted: 500, labelsGenerated: 480, price: '$750.00', status: 'In Progress' },
    { no: 7, type: 'Batch G', labelsSubmitted: 250, labelsGenerated: 240, price: '$400.00', status: 'Completed' },
    // Add more batch orders as needed...
  ];

  // Determine the current orders to display
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = batchOrdersData.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate total pages
  const totalPages = Math.ceil(batchOrdersData.length / ordersPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="batch-orders-container px-4 md:px-10 py-10 md:py-20 bg-custom-background">
      <Card>
        <h2 className={`${$GS.textHeading_2} mb-4`}>Batch Orders List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 border-custom-border">
            <thead className="bg-custom-background text-custom-text sticky top-0 z-30 border border-custom-border">
              <tr>
                <th className="border border-custom-border p-2">No</th>
                <th className="border border-custom-border p-2">Type</th>
                <th className="border border-custom-border p-2">Labels Submitted</th>
                <th className="border border-custom-border p-2">Labels Generated</th>
                <th className="border border-custom-border p-2">Price</th>
                <th className="border border-custom-border p-2">Status</th>
              </tr>
            </thead>
            <tbody className="bg-custom-background text-custom-text">
              {currentOrders.map(order => (
                <tr key={order.no}>
                  <td className="border border-custom-border p-2">{order.no}</td>
                  <td className="border border-custom-border p-2">{order.type}</td>
                  <td className="border border-custom-border p-2">{order.labelsSubmitted}</td>
                  <td className="border border-custom-border p-2">{order.labelsGenerated}</td>
                  <td className="border border-custom-border p-2">{order.price}</td>
                  <td className="border border-custom-border p-2">{order.status}</td>
                </tr>
              ))}
              {/* Add more rows here as necessary */}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button 
            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button 
              key={index + 1} 
              onClick={() => handlePageChange(index + 1)} 
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 border-${currentPage === index + 1 ? '2' : '1'} border-blue-600 mx-1 ${currentPage === index + 1 ? 'bg-blue-700 font-bold' : 'bg-blue-400 hover:bg-blue-500'}`}
            >
              {index + 1}
            </button>
          ))}
          <button 
            onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </Card>
    </div>
  );
};

export default BatchOrders;