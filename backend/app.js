const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
require("./conn/connection");

const router = require("./routes/user");
const RR = require("./routes/book");
const ff = require("./routes/favourite");
const cc = require("./routes/cart");
const rr = require("./routes/order");

const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use(router);
app.use(RR);
app.use(ff);
app.use(cc);
app.use(rr);

// Test Route
app.get("/", (req, res) => {
    res.send("Hello pong");
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`);
});