import { getUserInfoByToken } from "@/store/persistor";
import { getDb } from "./dbConn"
import { Expense, ExpenseCreate, ExpenseDatailLedgerOut, ExpenseItemOut, ExpenseOut } from "@/interfaces/expense";
import { RecordId, StringRecordId, Uuid } from "surrealdb";

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

const ParseLedger = (expense: ExpenseItemOut[]): ExpenseDatailLedgerOut[] => {
  const [parsed] = expense.flat();
  const result: ExpenseDatailLedgerOut[] = parsed.items.map((data) => ({
    description: data.description,
    vendor: data.vendor,
    total: data.total,
    time: {
      created_at: data.time.created_at,
      updated_at: data.time.updated_at
    }
  }))
  return result;
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
        items.{description, total, vendor},
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

    const startDate = `${2025}-${String(1).padStart(2, '0')}-01T00:00:00Z`
    const endDate = new Date(2028, 12, 1).toISOString();

    const query = `
      SELECT
        id,
        items.{description, total, vendor},
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
    const now = new Date();

    const newItem: Omit<ExpenseCreate, "expenseid"> = {
      id: Uuid.v4().toString(),
      vendor: data.vendor,
      description: data.description,
      total: data.total,
      icon: new StringRecordId(data.icon),
      time: {
        created_at: now,
        updated_at: now,
      }
    };

    if (data.id == "") {
      return await db.insert<any>("expense", {
        user: token?.id!,
        items: [newItem],
        time: newItem.time,
      })
    }

    const query = `
       UPSERT expense SET items = array::push(items, $item) WHERE id = $id;
     `;

    return await db.query<[ExpenseCreate]>(query, { item: newItem, id: data.id });
  } catch (e) {
    console.warn("partialCreate:", e)
    return null
  };
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
};

export const getExpenseById = async (id: StringRecordId): Promise<ExpenseDatailLedgerOut[]> => {
  try {
    const db = await getDb();
    const token = await getUserInfoByToken();
    await db.authenticate(token?.token!)

    const query = `
      SELECT
        items
      FROM expense WHERE id = ${new StringRecordId(id)}
    `;

    const result = await db.query<ExpenseItemOut[]>(query)
    const res = ParseLedger(result)
    return res.flat()
  } catch (e) {
    console.warn("getExpenseById:", e)
    return [];
  }
};
