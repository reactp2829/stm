import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchedQuery, setSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const columns = [
    { key: "transactionId", label: "Transaction ID" },
    { key: "customerName", label: "Customer Name" },
    { key: "product", label: "Product" },
    { key: "quantity", label: "Quantity" },
    { key: "price", label: "Price" },
    { key: "currency", label: "Currency" },
    { key: "date", label: "Date" },
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/upload/allRecords"
        );
        setTransactions(res.data.data);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleColumnFilterChange = (key, value) => {
    setColumnFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };
  

  const sortIcon = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  const filteredSortedData = useMemo(() => {
    let data = [...transactions];

    // Global search
    if (searchedQuery) {
      const query = searchedQuery.toLowerCase();
      data = data.filter((txn) =>
        Object.values(txn).some((val) =>
          String(val).toLowerCase().includes(query)
        )
      );
    }

    // Column filters
    Object.entries(columnFilters).forEach(([key, value]) => {
      if (value) {
        const val = value.toLowerCase();
        data = data.filter((txn) =>
          String(
            key === "date"
              ? new Date(txn[key]).toLocaleDateString()
              : txn[key]
          )
            .toLowerCase()
            .includes(val)
        );
      }
    });

    // Sorting
    if (sortConfig.key) {
      const { key, direction } = sortConfig;
      data.sort((a, b) => {
        let aVal = a[key];
        let bVal = b[key];
    
        if (key === "date") {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        } else if (typeof aVal === "number" && typeof bVal === "number") {
          // number comparison
        } else {
          aVal = String(aVal).toLowerCase();
          bVal = String(bVal).toLowerCase();
        }
    
        if (aVal < bVal) return direction === "asc" ? -1 : 1;
        if (aVal > bVal) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    

    return data;
  }, [transactions, searchedQuery, columnFilters, sortConfig]);

  return (
    <div className="p-4 max-w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Transaction Table asas</h2>
      {/* <input
        type="text"
        placeholder="Transaction Table Search..."
        value={searchedQuery}
        onChange={handleSearchChange}
        className="mb-4 px-4 py-2 border border-gray-300 rounded w-full sm:w-1/3"
      /> */}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50 text-left">
            <tr>
              {columns.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center gap-1">
                    {`${label}`}
                    <span className="text-sm">{sortIcon(key)}</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Filter"
                    value={columnFilters[key] || ""}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleColumnFilterChange(key, e.target.value)
                    }
                    className="mt-1 px-2 py-1 w-full border border-gray-200 rounded text-sm"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredSortedData.map((txn) => (
              <tr key={txn.transactionId}>
                <td className="px-4 py-2">{txn.transactionId}</td>
                <td className="px-4 py-2">{txn.customerName}</td>
                <td className="px-4 py-2">{txn.product}</td>
                <td className="px-4 py-2">{txn.quantity}</td>
                <td className="px-4 py-2">{txn.price}</td>
                <td className="px-4 py-2">{txn.currency}</td>
                <td className="px-4 py-2">
                  {new Date(txn.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSortedData.length === 0 && (
          <p className="text-gray-500 mt-4">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;
