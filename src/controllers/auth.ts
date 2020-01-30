import { Request, Response } from 'express';

import { AuthService, AuthenticatedUser } from '@services/auth';
import { Teacher } from '@models/Teacher';

export class AuthController {
  async registration(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const registeredUser: AuthenticatedUser<Teacher> = await AuthService.registration(email, password);

      return res.status(200).json(registeredUser);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const authenticatedUser: AuthenticatedUser<Teacher> = await AuthService.login(email, password);

      return res.status(200).json(authenticatedUser);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}
