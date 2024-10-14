import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { userName, email, password } = await request.json();

        const response = await axios.post('http://localhost:5000/signup', {
            userName,
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
        console.error('Error during signup:', error?.response?.data?.message);

        return NextResponse.json(
            { success: false, message: error?.response?.data?.message || 'Server error' }        );
    }
}
