import React,{useState,useEffect} from 'react'
import axios from "axios";

const EachCustomer = () => {
    const [spentByEachCustomers, setSpentByEachCustomers] = useState([]);
    useEffect(() => {
      const fetchProductList = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/v1/taskRoute/spentByCustomer"
          );
          setSpentByEachCustomers(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProductList();
    }, []);
    console.log('spent by each customers', spentByEachCustomers);
    return (
      <div className="p-4 max-w-full mx-auto">
        <h2 className="text-2xl font-bold mb-4">Amount Spent By Each Customer</h2>
  
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-50 text-left">
              <tr>
                 <th className="px-4 py-2 text-center">Customer Name</th>
                <th className="px-4 py-2 text-center">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {spentByEachCustomers.map((spentByEachCustomer, index) => (
                <tr key={index}>
                    <td className="px-4 py-2">{spentByEachCustomer._id}</td> 
                  <td className="px-4 py-2">{spentByEachCustomer.totalSpent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default EachCustomer