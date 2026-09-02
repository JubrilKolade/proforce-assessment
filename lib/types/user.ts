export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  phone?: string;
  location?: string;
  dob?: string;
  createdAt?: string;
}

export interface CreateUserPayload {
  name: string;
  location: string;
  dob: string;
}
