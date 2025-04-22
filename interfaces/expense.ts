import { StringRecordId } from "surrealdb";

type Expense = {
  id: string;
  items: { description: string; total: string, vendor: string }[];
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
  items: { description: string, total: string, vendor: string, icon?: { name: string; url: string } }[];
  time: {
    created_at: string;
    updated_at: string;
  };
};

type ExpenseItemOut = {
  items: {
    description: string, total: string, vendor: string,
    time: {
      created_at: Date,
      updated_at: Date
    }
  }[];
};

type ExpenseDatailLedgerOut = {
  description: string; total: string; vendor: string;
  time: {
    created_at: Date,
    updated_at: Date
  };
}

type ExpenseDatail = {
  description: string; total: string; vendor: string;
  time: {
    created_at: Date,
    updated_at: Date
  }
}

type ExpenseCreate = {
  id: string,
  expenseid: string,
  description: string,
  total: number,
  vendor: string,
  icon: StringRecordId,
  time: {
    created_at: Date;
    updated_at: Date;
  };

}

export { ExpenseCreate, Expense, ExpenseOut, ExpenseItemOut, ExpenseDatailLedgerOut, ExpenseDatail }
