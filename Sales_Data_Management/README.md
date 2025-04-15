#Sales Transaction Management System

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose 

## Features
- Upload CSV files and parse sales data
- Get All Transaction for a given customer
- Get All customer names
- Get a list of all unique products sold
- Total Sale Made: Price * Quantity
- Amount spent by each customer

## Application setup 

## Backend 
- cd server
- npm install 

## Start the server
- npm run dev

## Frontend
- cd client
- npm install 

## Start the server:
- npm run dev

## Docker 
docker compose up -d


## Check Docker Image is created or not 
docker ps 

## Remove Docker Images
docker rm -f imageId1,imageId1 ..

## Api EndPoints 
-POST https://localhost:3000/api/v1/upload/fileupload
-GET https://localhost:3000/api/v1/upload/allRecords
-GET https://localhost:3000/api/v1/upload/uploadedData
-GET https://localhost:3000/api/v1/taskRoute/customerName
-GET https://localhost:3000/api/v1/taskRoute/productList
-GET https://localhost:3000/api/v1/taskRoute/totalSales
-GET https://localhost:3000/api/v1/taskRoute/spentByCustomer


