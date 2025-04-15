import axios from "axios";
import React, { useEffect, useState } from "react";

const TotalSales = () => {
  const [totalSales, setTotalSales] = useState([]);
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/taskRoute/totalSales"
        );
        setTotalSales(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductList();
  }, []);
  console.log('totalSales11',totalSales);
  return (
    <div className="p-4 max-w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4"> Total Sales</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-2 text-center">Total Sale Made: Price * Quantity</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {totalSales.map((totalSalesData, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{totalSalesData.totalSales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalSales;
