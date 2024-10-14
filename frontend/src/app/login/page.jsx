"use client";

import { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = ({ target: { name, value } }) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        try {
            const { data } = await axios.post('/api/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (data.success) {
                setMessage({ type: 'success', text: 'Login successful! Redirecting to home...' });
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                setMessage({ type: 'error', text: data.message || 'Signup failed' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Something went wrong' });
        }
    };


    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: '/' });
    };


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
                    Sign In
                </h2>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Login to your account and start your journey with us!
                </p>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div className="mt-4">
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="block w-full px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-md placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="block w-full px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-md placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <div className="mt-8 space-y-6">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 dark:bg-red-500 border border-transparent rounded-md hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Sign In with Google
                    </button>
                </div>

                {message.text && (
                    <p className={`text-sm mt-4 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                        {message.text}
                    </p>
                )}

                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
                        SignUp
                    </a>
                </p>
            </div>
        </div>
    );
}
