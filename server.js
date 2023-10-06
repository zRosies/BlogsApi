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


app
    .use(cors(corsOptions))
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


