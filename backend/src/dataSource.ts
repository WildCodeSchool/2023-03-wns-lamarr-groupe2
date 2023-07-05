/* eslint-disable @typescript-eslint/no-var-requires */
import { DataSource } from "typeorm";
import { join } from "path";

require("dotenv").config();
const path = join(__dirname, "./models/*.ts");

const DBport =
  process.env.DB_PORT != null ? parseInt(process.env.DB_PORT, 10) : undefined;

// We check if DB_PORT is a number
if (typeof DBport === "number" && isNaN(DBport)) {
  // If conversion failed, exit
  console.error(`Invalid DB_PORT: ${DBport}`);
  process.exit();
}

// Create a new DataSource with the following configuration :
const dataSource = new DataSource({
  // if we run backend without docker, the host has to be 'localhost'
  // if we run backend with docker, the host has to be 'postgres'
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: DBport,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME,

  synchronize: true,

  entities: [path],
});

export default dataSource;
