import { DataSource } from "typeorm";
import { join } from "path";

const path = join(__dirname, "./models/*.ts");

const dataSource = new DataSource({
  // if we run backend without docker, the host has to be 'localhost'
  // if we run backend with docker, the host has to be 'postgres'
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "postgres",

  synchronize: true,

  entities: [path],
});

export default dataSource;
