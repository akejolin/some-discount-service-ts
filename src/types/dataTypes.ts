export interface DbBase {
  id: number;
}
export interface User extends DbBase {
  username: string;
  email: string;
  password: string;
}

export interface Code extends DbBase {
  code: string;
  desc: string;
  rate: number;
  target: string[];
  isUsed: boolean;
}

export interface UserCode extends DbBase {
  userId: number;
  codeId: number;
}

export interface Model {
  name: string;
  model: DbBase | User | UserCode;
}
