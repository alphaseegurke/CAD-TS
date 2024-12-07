import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from './models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (userId: number): string => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '24h' });
};

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

export const authenticateToken = async (token: string): Promise<User | null> => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
        const user = await User.findByPk(decoded.id);
        return user;
    } catch (error) {
        return null;
    }
};
