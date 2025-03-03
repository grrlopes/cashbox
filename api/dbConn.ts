import { DbConfig } from "@/interfaces/dbConfig";
import Surreal from "surrealdb";

const DEFAULT_CONFIG: DbConfig = {
  url: "https://local-069uqbqg35qd96ifkunc6bu0us.aws-use1.surreal.cloud/rpc",
  namespace: "personal",
  database: "cashbox",
};

export const getDb = async (): Promise<Surreal> => {
  const db = new Surreal();
  const config: DbConfig = DEFAULT_CONFIG

  try {
    await db.connect(config.url);
    await db.use({ namespace: config.namespace, database: config.database });
    return db;
  } catch (err) {
    console.error("Failed to connect to SurrealDB:", err instanceof Error ? err.message : String(err));
    await db.close();
    throw err;
  }
}
