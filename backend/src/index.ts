import { ApolloServer } from "apollo-server";
import dataSource from "./dataSource";
import { buildSchema } from "type-graphql";
import { WildersResolver } from "./resolvers/WildersResolver";

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [WildersResolver],
  });
  const server = new ApolloServer({
    schema,
  });
  try {
    const { url } = await server.listen({ port: 5000 });
    console.log(`Server ready at ${url}`);
  } catch {
    console.log("Error starting the server");
  }
};
void start();
