export interface DbBase {
  id: number;
}
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface Code {
  id: number;
  code: string;
  desc: string;
  rate: number;
  target: string[];
  isUsed: boolean;
}

export interface UserCode {
  id: number;
  userId: number;
  codeId: number;
}

export interface Model {
  name: string;
  model: DbBase | User | UserCode;
}