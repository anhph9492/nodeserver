
// index.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 4000;

const cors = require("cors");
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://anhph9492mongodbtest:forever9492@cluster0.xvgzewq.mongodb.net/test",
  // {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // },
);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

const { graphqlHTTP } = require("express-graphql");
const schema = require("./src/graphql/schema.js");
const resolvers = require("./src/graphql/resolvers.js");
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  }),
);

const mw = require("./src/middleware.js");
app.use(mw({ option1: "1", option2: "2" }));

const bookRouter = require("./src/routers/book.js");
app.use("/books", bookRouter);

app.get("/", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
// Export the Express API
module.exports = app;
