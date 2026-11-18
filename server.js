
const cors = require("cors");
const express = require("express");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

// Connect student routes
app.use("/api/students", require("./routes/studentRoutes"));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    await connectDB();
};

startServer();