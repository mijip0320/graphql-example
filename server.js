const path = require("path");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typesArray = loadFilesSync("**/*", {
  extensions: ["graphql"],
});
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

// const resolversArray = loadFilesSync("**/*", {
//   extensions: ["resolvers.js"],
// });
const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true, //localhost:3000/graphql로 접속하면 현재 구동되고 있는 graphql로 조회 가능
  })
);

app.listen(3000, () => {
  console.log("Running GraphQL server...");
});
