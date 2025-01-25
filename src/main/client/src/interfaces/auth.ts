export interface User {
  id: string;
  createdAt: Date;
  email: string;
  name: string;
}

export interface UserToUpdate {
  email: string;
  name: string;
}
