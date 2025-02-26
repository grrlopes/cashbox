import { getUserInfoByToken } from "@/store/persistor";
import { getDb } from "./dbConn"
import { Expense, ExpenseOut } from "@/interfaces/expense";

/**
 * Handles user authentication by validating credentials.
 * 
 * @param {Object} params - The input parameters for authentication.
 * @param {string} [params.name] - The optional first name of the user.
 * @param {string} [params.surname] - The optional surname of the user.
 * @param {string | null} params.email - The email of the user (required but can be null).
 * @param {string | null} params.password - The password of the user (required but can be null).
 */

const ParseExpenses = (expenses: Expense[]): ExpenseOut[] => {
  return expenses.map(({ id, items, items_icon, user, time }) => ({
    id,
    user: {
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
      status: user.status
    },
    time: {
      ...time
    },
    items: items.map((item, index) => ({
      ...item,
      icon: items_icon[index] ? { name: items_icon[index].name, url: items_icon[index].url } : undefined
    }))
  }));
}

export const listAllExpenses = async (): Promise<ExpenseOut[]> => {
  try {
    const db = await getDb();
    const token = await getUserInfoByToken();
    await db.authenticate(token?.token!)

    const query = `
      SELECT
        id,
        items.{description, total, name},
        items.icon.*.{name, id, url} AS items_icon,
        user.*,
        time
      FROM expense
    `;
    const listAll = await db.query<Expense[]>(query);
    return ParseExpenses(listAll.flat())
  } catch (e) {
    console.warn("validToken:", e)
    return []
  }
}
