// import { Request, Response } from 'express';
// import User from '../models/userModel.mjs';
// import bcrypt from 'bcryptjs';
// import { generateToken } from '../utils/jwtUtil';
//
// export const register = async (req: Request, res: Response) => {
//     const { name, email, password } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'User exists' });
//
//     const hashed = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashed });
//     const token = generateToken(user.id);
//     res.json({ token });
// };
// export const login = async (req: Request, res: Response) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });
//
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: 'Invalid credentials' });
//
//     const token = generateToken(user.id);
//     res.json({ token });
// };