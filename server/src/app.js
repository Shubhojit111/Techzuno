require('dotenv').config();
const express = require('express');
const app = express();
const connectDb = require("../config/db");
const authRoutes = require("../routes/authRoutes");
const cors=require("cors")
const cookieParser=require("cookie-parser")

connectDb();

app.use(cors({
    origin: [
    "http://localhost:3000",
  ],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.send("Techzuno Backend is running....");
})

app.use("/api/auth",authRoutes);

module.exports = app;