import { User } from '../entities/User';

export interface AuthRepository {
  loginWithEmail(email: string, password: string): Promise<User>;
  signUpWithEmail(email: string, password: string): Promise<User>;
}
