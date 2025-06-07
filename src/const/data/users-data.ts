interface User {
  email: string;
  password: string;
  role: "ADMIN" | "USER";
  name: string;
}

export const usersData: User[] = [
  {
    email: "admin@bookworm.com",
    password: "admin",
    role: "ADMIN",
    name: "Admin User"
  },
  {
    email: "john@example.com",
    password: "john123",
    role: "USER",
    name: "John Doe"
  },
  {
    email: "sarah@example.com",
    password: "sarah123",
    role: "USER",
    name: "Sarah Smith"
  },
  {
    email: "mike@example.com",
    password: "mike123",
    role: "USER",
    name: "Mike Johnson"
  }
]; 