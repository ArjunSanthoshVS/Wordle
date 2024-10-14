import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        const response = await axios.post('http://localhost:5000/login', {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error during login:', error?.response?.data?.message);

        return NextResponse.json(
            { success: false, message: error?.response?.data?.message || 'Server error' });
    }
}
