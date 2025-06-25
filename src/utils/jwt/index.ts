import jwt from 'jsonwebtoken';
import configEnv from '../../config/config.env';

class JwtUtil {
  static sign(payload: object): string {
    const secret = configEnv.get('JWT_SECRET');
    const expiresIn = configEnv.get('JWT_EXPIRES_IN');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment configuration');
    }
    if (!expiresIn) {
      throw new Error('JWT_EXPIRES_IN is not defined in environment configuration');
    }
    return jwt.sign(payload, secret, { expiresIn: String(expiresIn) });
  }

  static verify<T>(token: string): T {
    return jwt.verify(token, configEnv.get('JWT_SECRET')) as T;
  }
}

export default JwtUtil;
