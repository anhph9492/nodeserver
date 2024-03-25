// index.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 4000;

const cors = require("cors");
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/graphql-demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

const { graphqlHTTP } = require("express-graphql");
const schema = require("./src/graphql/schema.js");
const resolvers = require("./src/graphql/Resolvers.js");
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  }),
);
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
