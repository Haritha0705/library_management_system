import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Types
interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest extends LoginRequest {
    name: string;
}

interface LoginResponse {
    message: string;
    token: string;
}

const Login: React.FC = () => {
    const [mode, setMode] = useState<'Sign Up' | 'Login'>('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (mode === 'Sign Up') {
                const payload: RegisterRequest = { name, email, password };

                const response = await axios.post<LoginResponse>(
                    'http://localhost:3000/api/v1/member/register',
                    payload
                );

                localStorage.setItem('token', response.data.token);
                console.log('Sign Up success');
                navigate('/');
            } else {
                const payload: LoginRequest = { email, password };

                const response = await axios.post<LoginResponse>(
                    'http://localhost:3000/api/v1/member/login',
                    payload
                );

                localStorage.setItem('token', response.data.token);
                console.log('Login success');
                navigate('/');
            }
        } catch (err: any) {
            console.error('Auth error:', err);
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <form
                onSubmit={onSubmitHandler}
                className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-zinc-700"
            >
                <h2 className="text-lg font-semibold text-center">
                    {mode === 'Sign Up' ? 'Create an Account' : 'Login to Your Account'}
                </h2>

                {error && (
                    <p className="text-sm text-red-600 text-center font-medium">
                        {error}
                    </p>
                )}

                <p className="text-sm text-center text-zinc-500">
                    Please {mode === 'Sign Up' ? 'sign up' : 'log in'} to continue
                </p>

                {mode === 'Sign Up' && (
                    <div className="w-full">
                        <label className="block text-sm mb-1">Full Name</label>
                        <input
                            type="text"
                            className="border border-zinc-300 w-full rounded-lg p-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                    </div>
                )}

                <div className="w-full">
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        type="email"
                        className="border border-zinc-300 w-full rounded-lg p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div className="w-full">
                    <label className="block text-sm mb-1">Password</label>
                    <input
                        type="password"
                        className="border border-zinc-300 w-full rounded-lg p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={!email || !password || (mode === 'Sign Up' && !name)}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white w-full rounded-md text-base py-2 transition"
                >
                    {mode === 'Sign Up' ? 'Create Account' : 'Login'}
                </button>

                <p className="text-sm text-center mt-2">
                    {mode === 'Sign Up' ? (
                        <>
                            Already have an account?
                            <span
                                onClick={() => setMode('Login')}
                                className="text-blue-600 underline cursor-pointer ml-1"
                            >
                Login here
              </span>
                        </>
                    ) : (
                        <>
                            Create a new account?
                            <span
                                onClick={() => setMode('Sign Up')}
                                className="text-blue-600 underline cursor-pointer ml-1"
                            >
                Click here
              </span>
                        </>
                    )}
                </p>
            </form>
        </div>
    );
};

export default Login;
