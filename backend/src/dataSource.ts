import { DataSource } from "typeorm";
import { User } from "./models";

const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "postgres",

  synchronize: true,

  entities: [User],
});

export default dataSource;
