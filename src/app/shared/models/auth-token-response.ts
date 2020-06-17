import { User } from './user';

export class AuthTokenResponse {
  token: string;
  expiration: number;
  user: User;
}
