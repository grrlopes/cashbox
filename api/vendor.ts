import { Vendor } from "@/interfaces/vendor";
import { getDb } from "./dbConn";
import { getUserInfoByToken } from "@/store/persistor";
import { RecordId } from "surrealdb";

export const createVendor = async (vendorItem: Vendor): Promise<Vendor[]> => {
  try {
    const db = await getDb();
    const token = await getUserInfoByToken();
    await db.authenticate(token?.token!);

    const result = await db.insert<Vendor, Omit<Vendor, "id">>('store', {
      name: vendorItem.name,
      time: {
        created_at: new Date(),
        updated_at: new Date(),
      }
    });

    return result.flat()
  } catch (e) {
    console.warn("validVendorToken:", e)
    return []
  }
}

export const deleteVendor = async (vendorId: RecordId): Promise<string> => {
  console.log(vendorId.toString())
  try {
    const db = await getDb();
    const token = await getUserInfoByToken();
    await db.authenticate(token?.token!);

    const result = await db.delete(new RecordId('store', vendorId.id));

    return result.id.toString()
  } catch (e) {
    console.warn("deleteVendor:", e)
    return ""
  }
}

export const ListAllVendor = async (): Promise<Vendor[]> => {
  try {
    const db = await getDb();
    const token = await getUserInfoByToken();
    await db.authenticate(token?.token!)

    const result = await db.select<Vendor>("store");
    return result.flat();
  } catch (e) {
    console.warn("validVendorToken:", e)
    return []
  }
}
