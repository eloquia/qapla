export interface LoginResponse {
  userId: number;
  email: string;
  authdata?: string;
}

export interface UserData {
  userId: number;
  email: string;
}
