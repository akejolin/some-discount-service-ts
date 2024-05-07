export interface DbBase {
  id: number;
}
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface Model {
  name: string;
  model: DbBase | User;
}