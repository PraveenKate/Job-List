const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
    origin: "https://job-list-eef7f.web.app" // frontend URI (ReactJS)
}
app.use(express.json());
app.use(cors(corsOptions));

// Connect to MongoDB using mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const PORT = process.env.PORT || 8000
        app.listen(PORT, () => {
            console.log(`App is Listening on PORT ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });

app.get("/posts", async (req, res) => {
    try {
        // Connect to MongoDB using MongoClient
        const { MongoClient } = require('mongodb');
        const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        const agg = [
            {
              '$limit': 11
            }
          ];
        const coll = client.db('JobListing').collection('JobPost');
        const cursor = coll.aggregate();
        const result = await cursor.toArray();
        res.send(result);
        await client.close();
    } catch (error) {
        console.error("Error fetching job posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.post("/posts", async (req, res) => {
    try {
        const { MongoClient } = require('mongodb');
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const coll = client.db('JobListing').collection('JobPost');
        let result;

        if (!req.body.text) { // Check if req.body.text is empty or null
            // If req.body.text is empty or null, limit the results without searching
            
            const cursor = coll.aggregate();
            result = await cursor.toArray();
        } else {
            // If req.body.text is not empty, perform search and sorting
            const agg = [
                {
                    $search: {
                        index: 'default',
                        text: {
                            query: req.body.text,
                            path: 'techs'
                        }
                    }
                },
                {
                    $sort: {
                        exp: 1
                    }
                }
            ];
            const cursor = coll.aggregate(agg);
            result = await cursor.toArray();
        }

        res.send(result);
        await client.close();
    } catch (error) {
        console.error("Error fetching job posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/post", async (req, res) => {
    try {
    
        const { MongoClient } = require('mongodb');
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const database = client.db('JobListing');
        const collection = database.collection('JobPost');
        const result = await collection.insertOne(req.body);
        res.send("yes");
        await client.close();
    } catch (error) {
        console.error("Error storing job post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});






app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});
