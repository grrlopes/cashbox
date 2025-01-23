interface Authentication {
  name?: string;
  surname?: string;
  email: string | null;
  password: string | null;
}

export { Authentication }
