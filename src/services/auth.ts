import * as argon2 from 'argon2';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

import { TeacherDAO } from '@db/dao/teacher';
import { Teacher } from '@models/Teacher';
import { authConfig } from '@config/auth';

export type AuthenticatedUser<Entity> = {
  user: Entity,
  token: string
};

export class AuthService {
  /**
   * Registers new user.
   *
   * @param {string} email - user email
   * @param {string} password - user password
   * @returns {Promise<AuthenticatedUser>} - registered user and its token
   */
  static async registration(email: string, password: string): Promise<AuthenticatedUser<Teacher>> {
    const hashedPassword: string = await argon2.hash(password);

    const registeredUser: Teacher = await TeacherDAO.createOne({
      email,
      password: hashedPassword,
    });
    const token: string = this.generateToken(registeredUser);
    await TeacherDAO.saveOne(registeredUser);
    const user: Teacher | undefined = await TeacherDAO.findOne({
      where: { email }
    });

    if (user === undefined) {
      throw new Error('User is not found.');
    }

    return { user, token };
  }

  /**
   * Authenticates user.
   *
   * @param {string} email - user email
   * @param {string} password - user password
   * @returns {Promise<{user: Object, token: string}>} - logged in user and its token
   */
  static async login(email: string, password: string): Promise<AuthenticatedUser<Teacher>> {
    const registeredUser: Teacher | undefined = await TeacherDAO.findOne({
      where: { email },
      select: ['password']
    });

    if (registeredUser === undefined) {
      throw new Error('User is not found.');
    } else {
      const passwordIsCorrect: boolean = await argon2.verify(registeredUser.password, password);
      if (!passwordIsCorrect) {
        throw new Error('Password is incorrect.');
      }
    }

    const user: Teacher | undefined = await TeacherDAO.findOne({
      where: { email },
      select: ['id', 'email']
    });

    if (user === undefined) {
      throw new Error('Undefined user');
    }

    const token: string = this.generateToken(user);

    return { user, token };
  }

  /**
   * Generates JWT.
   *
   * @param {Object} user - registered user
   * @returns {string} signed JWT
   */
  static generateToken(user: Teacher): string {
    const data: object = {
      id: user.id,
      email: user.email,
    };
    const secret: Secret = authConfig.JWT_SECRET;
    const options: SignOptions = {
      expiresIn: authConfig.JWT_EXPIRATION
    };

    return jwt.sign({ data }, secret, options);
  }
}
