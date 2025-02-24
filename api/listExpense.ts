import { getUserInfoByToken } from "@/store/persistor";
import { getDb } from "./dbConn"
import { validToken } from "./auth";
import { Expense } from "@/interfaces/expense";

/**
 * Handles user authentication by validating credentials.
 * 
 * @param {Object} params - The input parameters for authentication.
 * @param {string} [params.name] - The optional first name of the user.
 * @param {string} [params.surname] - The optional surname of the user.
 * @param {string | null} params.email - The email of the user (required but can be null).
 * @param {string | null} params.password - The password of the user (required but can be null).
 */

// type Item = {
//   description: string;
//   name: string;
//   total: string;
// };

// type TimeInfo = {
//   created_at: string; // Assuming it's an ISO date string
//   updated_at: string;
// };

// type Expense = {
//   id: string; // "expense:<id>" format
//   items: Item[];
//   time: TimeInfo;
// };

export const listAllExpenses = async (): Promise<Array<Expense>> => {
  try {
    const db = await getDb();
    const token = await getUserInfoByToken();
    await db.authenticate(token?.token!)

    const listAll = await db.select<Expense>('expense')
    console.log(listAll, "xxxxxxxyyy=0")
    return listAll
} catch (e) {
  console.warn("validToken:", e)
  return []
}
}
