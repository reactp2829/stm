import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import TransactionTable from "./Components/TransactionTable";
import CustomerList from "./Components/CustomerList";
import ProductList from "./Components/ProductList";
import TotalSales from "./Components/TotalSales";
import EachCustomer from "./Components/EachCustomer";
import UploadHistoryData from "./Components/UploadHistoryData";

function App() {
  const [file, setFile] = useState("");
  const [status, setStatus] = useState("");
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadFile = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus("Please select a file first.");
      return;
    }
    //create form object and procced
    const formData = new FormData();
    formData.append("file", file);
    //call api here
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/upload/fileupload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      setStatus("Upload successful");
    } catch (error) {
      console.error("Upload failed:", error);
      setStatus("Upload failed");
    }
  };

  return (
    <>
      <div className="text-center">
        <div className="flex flex-col gap-5 my-10">
          <h3 className="text-5xl font-bold">Sales Data Management</h3>
        </div>
        <form onSubmit={handleUploadFile}>
          <div className="flex w-[80%]  h-[80%] shadow-lg border border-gray-200 pl-3 items-center gap-8 mx-auto ">
            <input
              type="file"
              placeholder="Upload Your CSV file"
              accept=".csv"
              onChange={handleFileChange}
              className="border-none outline-none w-full"
            />
            <button className="flex w-[80%] text-shadow-cyan-900">
              Upload File
            </button>
          </div>
        </form>
        <p className="mt-4 text-lg text-red-700">{status}</p>
      </div>
      <TransactionTable />
      <UploadHistoryData/>
      <CustomerList />
      <ProductList />
      <TotalSales />
      <EachCustomer />
    </>
  );
}

export default App;
