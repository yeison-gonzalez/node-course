import { envs } from "../../config";
import { CategoryModel, ProductModel, UserModel } from "../mongo";
import { MongoDatabase } from "../mongo/mongo-database";
import { seedData } from "./data";

(async () => {
  MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  })

  await main();

  MongoDatabase.disconnect();
})();

const randomBetween0andX = (x: number) => {
  return Math.floor(Math.random() * x);
}

async function main() {
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);

  const users = await UserModel.insertMany(seedData.users);

  const categories = await CategoryModel.insertMany(seedData.categories.map(category => ({ ...category, user: users[0]._id })));
  
  const products = await ProductModel.insertMany(seedData.products.map(product => ({ ...product, user: users[randomBetween0andX(seedData.users.length - 1)], category: categories[randomBetween0andX(seedData.categories.length - 1)] })))
}