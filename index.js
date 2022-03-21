const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

/**
 * Setup Middleware
 */
app.use(cors());
app.use(express.json());

/**
 * Mongo DB Setup
 */
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9ctq5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const database = client.db('wildlifePhotography');
        const eventCollection = database.collection('events');

        // Get Api
        app.get('/events', async (req, res) => {
            const cursor = eventCollection.find({});
            const events = await cursor.toArray();
            res.send(events);
        });

    } finally {
        // client.close();
    }
}


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    // console.log(uri);
    console.log(`Wild Life Server listening on port ${port}`);
});

run().catch(console.dir);