import React, { useEffect, useState } from "react";
import Card from "../Utils/Card.jsx"; // Ensure you have a Card component
import $GS from "../../styles/constants"; // Import your styles
import { toast } from "react-hot-toast";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  console.log(users);

  // Fetch the users from the API
  async function fetchUsers() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/get`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        toast.error("Something went wrong.");
        return;
      }

      setUsers(data.users); // Update the state with the fetched users
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  useEffect(() => {
    fetchUsers(); // Pass token as an argument to the function
  }, []);

  // Handle changes in the user role (send to backend)
  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_role: newRole,
          }),
          credentials: "include",
        }
      );

      const data = await res.json(); // Parsing the error response

      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      // Update the state with the new role
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, user_role: newRole } : user
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Toggle user access
  const toggleAccess = async (id) => {
    try {
      const user = users.find((user) => user._id === id);
      const newAccessStatus = !user.hasAccess;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hasAccess: newAccessStatus,
          }),
          credentials: "include",
        }
      );
      const data = await res.json(); // Parsing the error response

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      // Update the state with the new access status
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, hasAccess: newAccessStatus } : user
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Delete user from the database
  const deleteUser = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete user.");
        return;
      }

      // Remove the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.success(data.message || "User deleted successfully.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="px-4 md:px-10 py-10 md:py-20 bg-custom-background">
      <h2 className={`${$GS.textHeading_2} mb-6`}>User Management</h2>

      {/* User List */}
      {users && users.length > 0 ? (
        <Card>
          <h3 className={`${$GS.textHeading_3} mb-4`}>User List</h3>

          <table className="min-w-full text-sm bg-transparent border border-custom-border">
            <thead>
              <tr className="bg-custom-background text-white text-left">
                <th className="px-4 py-2 border-b border-custom-border">ID</th>
                <th className="px-4 py-2 border-b border-custom-border">
                  Name
                </th>
                <th className="px-4 py-2 border-b border-custom-border">
                  Email
                </th>
                <th className="px-4 py-2 border-b border-custom-border">
                  Role
                </th>
                <th className="px-4 py-2 border-b border-custom-border">
                  Services
                </th>
                <th className="px-4 py-2 border-b border-custom-border">
                  Access
                </th>
                <th className="px-4 py-2 border-b border-custom-border">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-900">
                  <td
                    className={`border-b border-custom-border  px-4 py-2 ${$GS.textSmall}`}
                  >
                    {user._id}
                  </td>
                  <td
                    className={`border-b border-custom-border px-4 py-2 ${$GS.textSmall}`}
                  >
                    {user.name}
                  </td>
                  <td
                    className={`border-b border-custom-border px-4 py-2 ${$GS.textSmall}`}
                  >
                    {user.email}
                  </td>
                  <td
                    className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}
                  >
                    <select
                      value={user.user_role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className={`${$GS.inputStyle} px-4 py-2 rounded-md bg-gray-900 border border-custom-border`}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                  <td
                    className={`border-b border-custom-border px-4 py-2 ${$GS.textNormal_1}`}
                  >
                    {user.services}
                  </td>
                  <td className={`border-b border-custom-border px-4 py-2`}>
                    <button
                      onClick={() => toggleAccess(user._id)}
                      className={`${$GS.buttonStyle} rounded-md py-1 px-3 ${
                        user.hasAccess
                          ? "bg-green-500 hover:bg-green-700"
                          : "bg-red-500 hover:bg-red-700"
                      }`}
                    >
                      {user.hasAccess ? "Access Granted" : "Access Revoked"}
                    </button>
                  </td>
                  <td className={`border-b border-custom-border px-4 py-2`}>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className={`${$GS.buttonStyle} rounded-md py-1 px-3 bg-red-500 hover:bg-red-700 ml-2`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : (
        <div className="w-full text-white">Loading </div>
      )}
    </div>
  );
};

export default UserManagement;
