const express= require("express");
const parser= require("body-parser");
const MongoClient= require("mongodb").MongoClient;
const mongodb = require("./db/connection");
const route = require("./routes/route");
const cors = require('cors');

const port = process.env.PORT;

const app = express();

const corsOptions = {
    origin: "*", // Replace with your React app's URL
    optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions))


app
    .use(parser.json())
    .use((req,res,next)=>{
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    })
    .use("/",route);

mongodb.initDb((err, mongodb)=>{
    if(err){
        console.log(err);
    }
    else{
        app.listen(port)
        console.log(`The app is listening at port ${port}`);
    }

})

app.post("/blogs", (req, res) => {
    const blogData = req.body;

    // Use the MongoDB client obtained from the initialization
    const db = mongodb.getDb();

    // Access the "blog" collection
    const blogCollection = db.collection("blog").find().toArray(); // Replace with your actual collection name

    // Insert the new blog entry into the collection
    blogCollection.insertOne(blogData, (err, result) => {
        if (err) {
            console.error("Error inserting blog data:", err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            console.log("New blog added:", result.ops[0]);
            res.status(201).json(result.ops[0]);
        }
    });
});

