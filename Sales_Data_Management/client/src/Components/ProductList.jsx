import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [productLists, setProductList] = useState([]);
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/taskRoute/productList"
        );
        setProductList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductList();
  }, []);
  return (
    <div className="p-4 max-w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4"> Unique Products List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-2 text-center">Distinct Product Lists</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {productLists.map((productList, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{productList}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
