import { envs } from "../../config";
import { MongoDatabase } from "../mongo/mongo-database";

(async () => {
  MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  })

  await main();

  MongoDatabase.disconnect();
})();

async function main() {

}