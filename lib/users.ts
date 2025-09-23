export type User = {
  id: number;
  email: string;
  password: string;
  role: string;
};
export const users: User[] = [
  { id: 1, email: "admin@example.com", password: "1234", role: "admin" },
  { id: 2, email: "user@example.com", password: "1234", role: "user" },
];
