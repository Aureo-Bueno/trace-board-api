import jwt from 'jsonwebtoken';
import configEnv from '../../config/config.env';

class JwtUtil {
  static sign(payload: object): string {
    const secret = configEnv.get('JWT_SECRET');
    const expiresInRaw = configEnv.get('JWT_EXPIRES_IN');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment configuration');
    }
    if (!expiresInRaw) {
      throw new Error('JWT_EXPIRES_IN is not defined in environment configuration');
    }
    const expiresIn = Number(expiresInRaw);
    if (isNaN(expiresIn)) {
      throw new Error('JWT_EXPIRES_IN must be a number (seconds) for Node 22 compatibility.');
    }
    return jwt.sign(payload, secret as string, { expiresIn, algorithm: 'HS256' });
  }

  static verify<T>(token: string): T {
    return jwt.verify(token, configEnv.get('JWT_SECRET') as string, { algorithms: ['HS256'] }) as T;
  }
}

export default JwtUtil;
