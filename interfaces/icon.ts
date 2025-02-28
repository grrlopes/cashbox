import { RecordId } from "surrealdb";

type Icon = {
  id: RecordId,
  name: string,
  url: string,
  time: {
    created_at: Date,
    updated_at: Date,
  };
};

export { Icon }
