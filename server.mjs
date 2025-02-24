import express from "express";
import mysql from "mysql2";
import cors from "cors";
import res from "express/lib/response.js";
import http from "http";
import { Buffer } from 'node:buffer';
// const express = require('express');
const app = express();

app.use(cors());

const corsOrigin = {
    origin: 'http://127.0.0.1:5500',
}
app.use(cors(corsOrigin))

const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});

// Middleware to parse JSON and form data
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

// Handle POST requests
app.post('/submit', (req, res) => {
    console.log('Received POST Data:', req.body); // Access the POST data
    res.json({ message: 'Data received', data: req.body });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});