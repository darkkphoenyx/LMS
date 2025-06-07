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
    email: "suman@example.com",
    password: "user",
    role: "USER",
    name: "Suman Bisunkhe"
  },
  
  {
    email: "deepesh@example.com",
    password: "user",
    role: "USER",
    name: "Deepesh Sunuwar"
  },
  {
    email: "rohan@example.com",
    password: "user",
    role: "USER",
    name: "Rohan Shrestha"
  }
]; 