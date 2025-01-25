import { getDb } from '@/api/dbConn';
import { LogIn } from '@/interfaces/auth';
import { User } from '@/interfaces/user';
import * as SecureStore from 'expo-secure-store';

const USER_TOKEN_KEY = 'userToken';

export const storeUserToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(USER_TOKEN_KEY, token);
  } catch (e) {
    console.error('Failed to save the user token to secure storage', e);
  }
};

export const getUserInfoByToken = async (): Promise<LogIn | null> => {
  try {
    const token = await SecureStore.getItemAsync(USER_TOKEN_KEY);
    const db = await getDb();
    const validToken = await db.authenticate(token!);
    const decoded = await db.info<User>();
    if (validToken) {
      const Auth: LogIn = {
        name: decoded?.name!,
        token: token!,
        email: decoded?.email!,
        id: decoded?.id,
      };
      return Auth;
    }
    await removeUserToken();
    return null;
  } catch (e) {
    throw `Failed to fetch the user token from secure storage: ${e}`;
  }
};

export const removeUserToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(USER_TOKEN_KEY);
  } catch (e) {
    console.error('Failed to remove the user token from secure storage', e);
  }
};
