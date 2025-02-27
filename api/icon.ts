import { Icon } from "@/interfaces/icon";
import { getDb } from "./dbConn";
import { getUserInfoByToken } from "@/store/persistor";

export const ListAllIcon = async (): Promise<Icon[]> => {
  try {
    const db = await getDb();
    const token = await getUserInfoByToken();
    await db.authenticate(token?.token!)

    const result = await db.select<Icon>("icon");
    // console.log(JSON.stringify(result))
    return result
  } catch (e) {
    console.warn("validToken:", e)
    return []
  }
}
