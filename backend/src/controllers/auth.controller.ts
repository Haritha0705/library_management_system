import { Request, Response } from 'express';
import bcrypt from "bcryptjs"
import User from "../models/user.model"
import { generateToken } from '../utils/jwt.util';

export const register =