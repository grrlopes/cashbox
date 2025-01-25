import { RecordId } from "surrealdb";

type User = {
  email: string;
  id: RecordId;
  name: string;
  password: string;
  role: string;
  status: string;
}

export { User }
