import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/dbConnection.js";
import uploadRouter from "./routes/upload.route.js";
import taskRouter from "./routes/task.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Setup
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,
// };
app.use(cors());
//app.use(cors(corsOptions));

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/taskRoute",taskRouter);
// Root route for testing
app.get('/', (req, res) => {
  res.send('Express server 123 is running');
});

//DB connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
