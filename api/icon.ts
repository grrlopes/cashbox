import { Icon } from "@/interfaces/icon";
import { getDb } from "./dbConn";
import { getUserInfoByToken } from "@/store/persistor";

export const createIcon = async (iconItem: Icon): Promise<Icon[]> => {
  try {
    const db = await getDb();
    const token = await getUserInfoByToken();
    await db.authenticate(token?.token!);

    const result = await db.insert<Icon, Omit<Icon, "id">>('icon', {
      name: iconItem.name,
      url: iconItem.url,
      time: {
        created_at: new Date(),
        updated_at: new Date(),
      }
    });

    return result.flat()
  } catch (e) {
    console.warn("validToken:", e)
    return []
  }
}

export const ListAllIcon = async (): Promise<Icon[]> => {
  try {
    const db = await getDb();
    const token = await getUserInfoByToken();
    await db.authenticate(token?.token!)

    const result = await db.select<Icon>("icon");
    return result.flat()
  } catch (e) {
    console.warn("validToken:", e)
    return []
  }
}
