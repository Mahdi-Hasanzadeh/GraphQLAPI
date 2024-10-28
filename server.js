import express from "express";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema.js";

const app = express();

// Connect to MongoDB

mongoose
  .connect("mongodb://localhost:27017/RestAPI")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// GraphQL middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL for testing queries and mutations
  })
);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/graphql`);
});
