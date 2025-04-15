import axios from "axios";
import React, { useEffect, useState } from "react";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/taskRoute/customerName"
        );
        setCustomers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomerList();
  }, []);
  return (
    <div className="p-4 max-w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Customer List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-2 text-center">Distinct Customer Name</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {customers.map((customer, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{customer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
