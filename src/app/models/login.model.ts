export interface LoginInput {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  expiration: string;
}
