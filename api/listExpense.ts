import { getUserInfoByToken } from "@/store/persistor";
import { getDb } from "./dbConn"
import { Expense, ExpenseCreate, ExpenseOut } from "@/interfaces/expense";
import { RecordId } from "surrealdb";

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

export const partialCreate = async (data: ExpenseCreate): Promise<any> => {
  try {
    const db = await getDb();
    const token = await getUserInfoByToken();
    await db.authenticate(token?.token!);

    const id = new RecordId('expense', '3ztblm8n8w5f146l25xe');
    console.log(id)
    const newItem: ExpenseCreate = {
      name: data.name,
      description: data.description,
      total: data.total,
      icon: new RecordId('icon', 'hilqprt4v8qgc8355e3z')
    };
    const query = `
      UPSERT expense SET items = array::push(items, $item) WHERE id = $id
    `;
    const result = await db.query<[ExpenseCreate]>(query, { item: newItem, id: id });
    return result;
  } catch (e) {
    console.warn("validToken:", e)
    return
  }
}
