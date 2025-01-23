type Expense = {
  id: string;
  items: Array<{
    description: string;
    name: string;
    total: string;
  }>;
  time: {
    created_at: string;
    updated_at: string;
  };
  user: string;
}

export { Expense }
