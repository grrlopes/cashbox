import { jsonify } from "surrealdb";
import { getDb } from "./dbConn"
import { Expense } from "@/interfaces/expense";
import { Authentication } from "@/interfaces/auth";

export const doLogin = async (auth: Authentication): Promise<void> => {
  try {
    console.log(auth)
    const db = await getDb();
    // const token = await db.signin({
    //   access: 'authentication',
    //   variables: {
    //     email: auth.email,
    //     password: auth.password,
    //   },
    // });

    console.log(await db.authenticate("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3Mzc2MTMxNzQsIm5iZiI6MTczNzYxMzE3NCwiZXhwIjoxNzM4MjE3OTc0LCJpc3MiOiJTdXJyZWFsREIiLCJqdGkiOiI3MTNlZjRmNy1mMDU3LTQzNDMtOGEzMi04NmViMWM2MTQ1NTciLCJOUyI6InBlcnNvbmFsIiwiREIiOiJjYXNoYm94IiwiQUMiOiJhdXRoZW50aWNhdGlvbiIsIklEIjoidXNlcjpxYWd1MHc0eWh6b3kyMnJ3aWdqeiJ9.6xU8HlcIANN97oX8TlSj_Fs7JdicPIU9L_jTLPfZJZU-501VTI_WP_A2tPV3I-yE3QA-YGEdtEKLb4kubWC4bw"))

    const people = await db.select<Expense>('expense');
    console.log(jsonify(people))
    db.close()
  } catch (error) {
    console.error("errr:", error)
  }
}
