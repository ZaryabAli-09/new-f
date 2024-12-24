// src/components/Orders.js
import React, { useState, useEffect } from "react";
import Card from "../Utils/Card"; // Ensure you have a Card component
import $GS from "../../styles/constants"; // Import your styles
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch orders from the API
    const fetchOrders = async () => {
      if (!user || !isAuthenticated) {
        toast.error("Please login.");
        return;
      }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/order-label/orders/${user._id}`
        ); // Make sure the URL matches your backend route
        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }

        const data = await response.json();
        setOrdersData(data.orders || []); // Ensure we set an array even if data.orders is undefined
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, isAuthenticated]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin" />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="orders-container px-4 md:px-10 py-10 md:py-20 bg-custom-background">
      <Card>
        <h2 className={`${$GS.textHeading_2} mb-4`}>Orders List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 border-custom-border">
            <thead className="bg-custom-background text-custom-text sticky top-0 z-30 border border-custom-border">
              <tr>
                <th className="border border-custom-border p-2">No</th>
                <th className="border border-custom-border p-2">Service</th>
                <th className="border border-custom-border p-2">Sender</th>
                <th className="border border-custom-border p-2">Receiver</th>
                <th className="border border-custom-border p-2">Tracking #</th>
                <th className="border border-custom-border p-2">Added</th>
              </tr>
            </thead>
            <tbody className="bg-custom-background text-custom-text">
              {ordersData.length > 0 ? (
                ordersData.map((order, index) => (
                  <tr key={order.tracking_number}>
                    <td className="border border-custom-border p-2">
                      {index + 1}
                    </td>
                    <td className="border border-custom-border p-2">
                      {order.service_name}
                    </td>
                    <td className="border border-custom-border p-2">
                      {order.sender.sender_name} ({order.sender.sender_company})
                    </td>
                    <td className="border border-custom-border p-2">
                      {order.receiver.receiver_name} (
                      {order.receiver.receiver_company})
                    </td>
                    <td className="border border-custom-border p-2">
                      {order.tracking_number}
                    </td>
                    <td className="border border-custom-border p-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="border border-custom-border p-2 text-center"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Orders;
