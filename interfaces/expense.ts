import { StringRecordId } from "surrealdb";

type Expense = {
  id: string;
  items: { description: string; total: string, name: string }[];
  items_icon: { id: string; name: string; url: string }[];
  user: { email: string, id: string, name: string, role: string, status: string };
  time: {
    created_at: string;
    updated_at: string;
  };
};

type ExpenseOut = {
  id: string;
  user: { email: string, id: string, name: string, role: string, status: string };
  items: { description: string, total: string, name: string, icon?: { name: string; url: string } }[];
  time: {
    created_at: string;
    updated_at: string;
  };
};

type ExpenseItemOut = {
  items: { description: string, total: string, name: string }[];
};

type ExpenseDatailLedgerOut = {
  description: string; total: string; name: string;
}

type ExpenseDatail = {
  description: string; total: string; name: string;
}

type ExpenseCreate = {
  id: string,
  expenseid: string,
  description: string,
  total: number,
  name: string,
  icon: StringRecordId,
  time: {
    created_at: Date;
    updated_at: Date;
  };

}

export { ExpenseCreate, Expense, ExpenseOut, ExpenseItemOut, ExpenseDatailLedgerOut, ExpenseDatail }
