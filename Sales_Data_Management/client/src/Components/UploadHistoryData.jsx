import axios from "axios";
import React, { useEffect, useState } from "react";
const UploadHistoryData = () => {
  const [previousData, setPreviousData] = useState([]);
  useEffect(() => {
    const fetchUploadedData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/upload/uploadedData"
        );
        setPreviousData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch History Data", error);
      }
    };

    fetchUploadedData();
  }, []);
  return (
    <div className="p-4 max-w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4"> Previous Uploaded File Info</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-2">File Name</th>
              <th className="px-4 py-2">ProcessedRows</th>
              <th className="px-4 py-2">Uploaded Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {previousData.map((hist) => (
              <tr key={hist.__id}>
                <td className="px-4 py-2">{hist.filename}</td>
                <td className="px-4 py-2">{hist.processedRows}</td>
                <td className="px-4 py-2">
                  {new Date(hist.uploadDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {previousData.length === 0 && (
          <p className="text-gray-500 mt-4">No data found.</p>
        )}
      </div>
    </div>
  );
};

export default UploadHistoryData;
