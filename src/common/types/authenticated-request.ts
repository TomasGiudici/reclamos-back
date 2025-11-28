import { Request } from 'express';
import { Roles } from '../enums/roles.enum';

export interface AuthUser {
  id: string;
  email: string;
  role: Roles;
}

export interface AuthenticatedRequest extends Request {
  user: AuthUser;
}
