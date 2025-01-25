interface Authentication {
  name?: string;
  surname?: string;
  email: string | null;
  password: string | null;
};

interface LogIn {
  email: string;
  id: any;
  name: string;
  token: string;
}

export { Authentication, LogIn }
