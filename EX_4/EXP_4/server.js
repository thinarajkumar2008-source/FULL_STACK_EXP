/**
 * Web Application Development Practical
 * Experiment 4: Node.js GET and POST Request Handling
 *
 * Name: THINA RAJKUMAR R
 * Department: B.Tech Information Technology
 * College: Kongu Engineering College
 */

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse HTML form data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Temporary in-memory student data
const registeredUsers = [
    {
        id: 1,
        name: "THINA RAJKUMAR R",
        email: "thinarajkumar278@gmail.com",
        role: "Student",
        department: "B.Tech Information Technology"
    }
];

// GET: Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// GET: Search using query parameters
// Example: /api/search?keyword=node&category=web
app.get("/api/search", (req, res) => {

    const keyword = String(req.query.keyword || "").trim();
    const category = String(req.query.category || "all").trim();

    if (!keyword) {
        return res.status(400).json({
            status: "error",
            message: "Please provide a keyword."
        });
    }

    console.log("GET Request Received");
    console.log("Keyword:", keyword);
    console.log("Category:", category);

    res.status(200).json({
        status: "success",
        method: "GET",
        student: "THINA RAJKUMAR R",
        receivedQuery: {
            keyword: keyword,
            category: category
        },
        resultsCount: 2,
        data: [
            {
                id: 101,
                title: `Result for ${keyword}`,
                category: category
            },
            {
                id: 102,
                title: `More information about ${keyword}`,
                category: category
            }
        ]
    });
});

// GET: Display all registered users
app.get("/api/users", (req, res) => {

    res.status(200).json({
        status: "success",
        method: "GET",
        total: registeredUsers.length,
        users: registeredUsers
    });
});

// POST: Register a student using JSON or form data
app.post("/api/register", (req, res) => {

    const name =
        typeof req.body.name === "string"
            ? req.body.name.trim()
            : "";

    const email =
        typeof req.body.email === "string"
            ? req.body.email.trim()
            : "";

    const role =
        typeof req.body.role === "string" && req.body.role.trim()
            ? req.body.role.trim()
            : "Student";

    // Validate the submitted data
    if (!name || !email) {
        return res.status(400).json({
            status: "error",
            message: "Name and email are required."
        });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            status: "error",
            message: "Please enter a valid email address."
        });
    }

    const newUser = {
        id: registeredUsers.length + 1,
        name: name,
        email: email,
        role: role,
        department: "B.Tech Information Technology"
    };

    registeredUsers.push(newUser);

    console.log("POST Request Received");
    console.log("New Student:", newUser);

    res.status(201).json({
        status: "success",
        method: "POST",
        message: "Student registered successfully!",
        data: newUser
    });
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "404 - Endpoint not found."
    });
});

// Start the server
app.listen(PORT, () => {
    console.log("-------------------------------------------");
    console.log("Node.js GET and POST Application");
    console.log("Student: THINA RAJKUMAR R");
    console.log("Department: B.Tech Information Technology");
    console.log("College: Kongu Engineering College");
    console.log(`Server running at http://localhost:${PORT}`);
    console.log("-------------------------------------------");
});
