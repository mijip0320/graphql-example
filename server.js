const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const schema = buildSchema(`
    type Query {
        products : [Product]
    }

    type Product {
      description : String!
      reviews : [Review]
      price : Float!
    }

    type Review {
      rating : Int!
      comment : String
    }
`);

const root = {
  description: "Red Shoe",
  price: 42.12,
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, //localhost:3000/graphql로 접속하면 현재 구동되고 있는 graphql로 조회 가능
  })
);

app.listen(3000, () => {
  console.log("Running GraphQL server...");
});
