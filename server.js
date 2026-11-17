
const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Server is Running!");
});

// Connect student routes
app.use("/api/students", require("./routes/studentRoutes"));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();

app.use("/api/students", require("./routes/studentRoutes"));