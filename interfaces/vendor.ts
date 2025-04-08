import { RecordId } from "surrealdb";

type Vendor = {
  id: RecordId,
  name: string,
  time: {
    created_at: Date,
    updated_at: Date,
  };
};

export { Vendor }
