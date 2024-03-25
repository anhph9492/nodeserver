// index.js
const express = require("express");
const app = express();
const PORT = 4000;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://anhph9492mongodbtest:forever9492@cluster0.xvgzewq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// const redis = require('redis');
// const client = redis.createClient({
//   password: 'mRY81VkGg3AHJe4EBMhdD7axWLQqy0Dk',
//   socket: {
//       host: 'redis-19558.c1.asia-northeast1-1.gce.cloud.redislabs.com',
//       port: 19558
//   }
// });
// client.on('error', err => console.log('Redis Client Error', err));
// client.connect()
// .then(res => {
//   console.log('redis connection successfully - ')
// })
// .catch(err => {
//   console.log('redis connection falure - ')
// });

const mw = require("./middleware.js");
app.use(mw({ option1: "1", option2: "2" }));

const bookRouter = require("./routers/book.js");
app.use("/books", bookRouter);

app.get("/", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
// Export the Express API
module.exports = app;
