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

export const getCurrentMonthExpense = async (): Promise<ExpenseOut[]> => {
  try {
    const db = await getDb();
    const token = await getUserInfoByToken();
    await db.authenticate(token?.token!)
    const expenseId = await getIdByCurrentDate();

    const query = `
      SELECT
        id,
        items.{description, total, name},
        items.icon.*.{name, id, url} AS items_icon,
        user.*,
        time
      FROM expense WHERE id = $id
    `;

    const listAll = await db.query<Expense[]>(query, { id: expenseId });
    return ParseExpenses(listAll.flat())
  } catch (e) {
    console.warn("getCurrentMonthExpense:", e)
    return []
  }
};

export const listAllExpenses = async (): Promise<ExpenseOut[]> => {
  try {
    const db = await getDb();
    const token = await getUserInfoByToken();
    await db.authenticate(token?.token!)

    const startDate = `${2025}-${String(2).padStart(2, '0')}-01T00:00:00Z`
    const endDate = new Date(2025, 3, 1).toISOString();

    const query = `
      SELECT
        id,
        items.{description, total, name},
        items.icon.*.{name, id, url} AS items_icon,
        user.*,
        time
      FROM expense WHERE time.created_at >= d'${startDate}' AND time.created_at < d'${endDate}';
    `;
    await getIdByCurrentDate();
    const listAll = await db.query<Expense[]>(query);
    return ParseExpenses(listAll.flat())
  } catch (e) {
    console.warn("validToken:", e)
    return []
  }
}

/**
* This method push item into an existent month expense
**/
export const partialCreate = async (data: ExpenseCreate): Promise<any> => {
  try {
    const db = await getDb();
    const token = await getUserInfoByToken();
    await db.authenticate(token?.token!);

    const newItem: ExpenseCreate = {
      name: data.name,
      description: data.description,
      total: data.total,
      icon: new RecordId('icon', 'r6837i0u0v37za23iko6'),
      id: data.id
    };

    const query = `
      UPSERT expense SET items = array::push(items, $item) WHERE id =  $id;
    `;

    const result = await db.query<[ExpenseCreate]>(query, { item: newItem, id: newItem.id });
    return result;
  } catch (e) {
    console.warn("partialCreate:", e)
    return
  }
};

export const getIdByCurrentDate = async (): Promise<string> => {
  const dates = new Date();
  try {
    const db = await getDb();
    const token = await getUserInfoByToken();
    await db.authenticate(token?.token!)

    const year = dates.getFullYear();
    const month = dates.getMonth();

    const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01T00:00:00Z`
    const endDate = new Date(year, month + 1, 1).toISOString();

    const query = `
      SELECT
        id
      FROM expense WHERE time.created_at >= d'${startDate}' AND time.created_at < d'${endDate}';
    `;

    const expenseId = await db.query<[]>(query);
    const result = expenseId.flat();
    const res = result[0] as { id: string };
    return res.id;
  } catch (e) {
    console.warn("getIdByCurrentDate:", e)
    return ""
  }
}
