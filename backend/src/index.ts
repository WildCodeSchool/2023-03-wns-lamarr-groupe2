/* eslint-disable @typescript-eslint/no-var-requires */
import { ApolloServer } from "apollo-server";
import dataSource from "./dataSource";
import { buildSchema } from "type-graphql";
// import { join } from "path";
import { AuthResolver } from "./resolvers/AuthResolver";
import { User } from "./models/User";
import { JwtPayload, verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// const path = join(__dirname, "./models/*.ts");
const start = async (): Promise<void> => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [AuthResolver],
    authChecker: ({ context }) => {
      return !!context.user;
    },
  });
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (token == null) {
        return { user: null };
      }
      try {
        const payload = verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
        const user = await User.findOne({ where: { id: payload.userId } });
        return { user };
      } catch (err) {
        return { user: null };
      }
    },
  });
  try {
    const { url } = await server.listen({
      port: process.env.BACKEND_PORT,
    });
    console.log(`Server ready at ${url}`);
  } catch {
    console.log("Error starting the server");
  }
};
void start();
