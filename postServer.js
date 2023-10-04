const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 9090;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/your-database-name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema and model for the "blog" collection
const blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
});
const Blog = mongoose.model("Blog", blogSchema);

// Create a POST endpoint to add a new blog to the collection
app.post("/blogs", (req, res) => {
    const blogData = req.body;

    // Create a new blog document and save it to the "blog" collection
    const newBlog = new Blog(blogData);
    newBlog.save((err, savedBlog) => {
        if (err) {
            console.error("Error inserting blog data:", err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            console.log("New blog added:", savedBlog);
            res.status(201).json(savedBlog);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});