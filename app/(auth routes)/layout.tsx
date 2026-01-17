'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api/api';
import { ApiError } from '@/app/api/api'


const SignUp = () => {
    const router = useRouter();
    const [error, setError] = useState('');

    const handleSubmit = async (formData: FormData) => {
        try {
            const formValues = Object.fromEntries(formData) as RegisterRequest;
            const res = await register(formValues)
            if (res) {
                router.push("/profile")
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError(
                (error as ApiError).response?.data?.error ??
                (error as ApiError).message ??
                'Oops... some error'
            )
        }
    };

    return (
        <>
            <h1>Sign up</h1>
            <form action={handleSubmit}>
                <label>
                    Username
                    <input type="text" name="userName" required />
                </label>
                <label>
                    Email
                    <input type="email" name="email" required />
                </label>
                <label>
                    Password
                    <input type="password" name="password" required />
                </label>
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default SignUp;