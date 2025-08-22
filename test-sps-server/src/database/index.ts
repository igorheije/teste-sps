import bcrypt from "bcryptjs";
import { User, CreateUserRequest, UpdateUserRequest } from "../types";

let users: User[] = [];
let nextId: number = 1;

export const initializeDatabase = async (): Promise<void> => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  users = [
    {
      id: nextId.toString(),
      name: "Administrador",
      email: "admin@sps.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  nextId++;
  console.log("Database initialized with admin user");
};

export const createUser = async (userData: CreateUserRequest): Promise<Omit<User, 'password'>> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser: User = {
    id: nextId.toString(),
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    role: userData.role || "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  users.push(newUser);
  nextId++;
  
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

export const findUserById = (id: string): Omit<User, 'password'> | null => {
  const user = users.find((user) => user.id === id);
  if (!user) return null;
  
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getAllUsers = (): Omit<User, 'password'>[] => {
  return users.map((user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
};

export const updateUser = async (id: string, userData: UpdateUserRequest): Promise<Omit<User, 'password'> | null> => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return null;
  }

  const updatedUser = { ...users[userIndex] };

  if (userData.name) updatedUser.name = userData.name;
  if (userData.email) updatedUser.email = userData.email;
  if (userData.password) {
    updatedUser.password = await bcrypt.hash(userData.password, 10);
  }
  if (userData.role) updatedUser.role = userData.role;

  updatedUser.updatedAt = new Date();

  users[userIndex] = updatedUser;
  
  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export const deleteUser = (id: string): boolean => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return false;
  }

  users.splice(userIndex, 1);
  return true;
};

export const checkEmailExists = (email: string, excludeId?: string): boolean => {
  return users.some(
    (user) =>
      user.email === email && (!excludeId || user.id !== excludeId)
  );
};
