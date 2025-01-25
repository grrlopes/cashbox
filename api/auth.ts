import { getUserInfoByToken, removeUserToken, storeUserToken } from "@/store/persistor";
import { getDb } from "./dbConn"
import { Authentication } from "@/interfaces/auth";


/**
 * Handles user authentication by validating credentials.
 * 
 * @param {Object} params - The input parameters for authentication.
 * @param {string} [params.name] - The optional first name of the user.
 * @param {string} [params.surname] - The optional surname of the user.
 * @param {string | null} params.email - The email of the user (required but can be null).
 * @param {string | null} params.password - The password of the user (required but can be null).
 */
export const doLogin = async (auth: Authentication): Promise<void> => {
  try {
    const db = await getDb();
    const token = await db.signin({
      access: 'authentication',
      variables: {
        email: auth.email,
        password: auth.password,
      },
    });
    db.close()
    storeUserToken(token);
  } catch (e) {
    await removeUserToken();
    console.warn("doLogin:", e);
    throw `doLogin: ${e}`
  }
}

/**
 * Check if the token is still active.
 * @return boolean - 
 **/
export const validToken = async (): Promise<boolean> => {
  try {
    const db = await getDb();
    const token = await getUserInfoByToken();
    return db.authenticate(token?.token!)
  } catch (e) {
    console.warn("validToken:", e)
    return false;
  }
}
