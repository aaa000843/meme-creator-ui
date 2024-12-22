export interface User {
  _id: string;
  email: string;
  name: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number; // Optional as it's MongoDB specific version key
}

// You might also want a type without sensitive information
export type SafeUser = Omit<User, 'password'>;

// For creating a new user
export type CreateUserDTO = Pick<User, 'email' | 'name' | 'password'>;

// For updating a user
export type UpdateUserDTO = Partial<CreateUserDTO>;
