import { Request, Response, NextFunction } from 'express';
import JwtUtil from '../../utils/jwt';
import User from '../../models/user';

declare global {
  namespace Express {
    interface Request {
      user?: typeof User.prototype;
    }
  }
}

interface JwtPayload {
  id: number;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'Invalid token' });

  const [, token] = authHeader.split(' ');

  try {
    const decoded = JwtUtil.verify<JwtPayload>(token);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
