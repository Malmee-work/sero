import MongoDB from "./mongodb";
import config from "../config";

const mongo = new MongoDB({
  url: config.mongourl,
  db: config.mongodb,
});

export default mongo;
