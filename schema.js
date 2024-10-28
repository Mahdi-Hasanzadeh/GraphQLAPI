import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import Product from "./models/Product.js";

// Define the Product type
const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    description: { type: GraphQLString },
  }),
});

// Define Queries for Reading Products
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getProducts: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find();
      },
    },
    getProduct: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findById(args.id);
      },
    },
  },
});

// Define Mutations for Creating, Updating, and Deleting Products
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        description: { type: GraphQLString },
      },
      resolve(parent, args) {
        let product = new Product({
          name: args.name,
          price: args.price,
          description: args.description,
        });
        return product.save();
      },
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        description: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Product.findByIdAndUpdate(
          args.id,
          {
            name: args.name,
            price: args.price,
            description: args.description,
          },
          { new: true }
        );
      },
    },
    deleteProduct: {
      type: GraphQLString,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Product.findByIdAndDelete(args.id).then(
          () => "Product deleted successfully."
        );
      },
    },
  },
});

// Export the GraphQL Schema
// module.exports = new GraphQLSchema({
//   query: RootQuery,
//   mutation: Mutation,
// });

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
