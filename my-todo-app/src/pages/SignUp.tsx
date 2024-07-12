import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthService } from '../features/auth/AuthProvider';

const SignUp: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const authService = useAuthService();
	const navigate = useNavigate();

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		const success = await authService.signup(username, password).toPromise();
		if (success) {
			navigate({ to: '/' });
		} else {
			alert('Sign up failed. Username might be taken.');
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<h1 className='text-3xl font-bold mb-6'>Sign Up</h1>
			<form
				onSubmit={handleSignUp}
				className='w-full max-w-sm bg-white p-6 rounded shadow-md'
			>
				<div className='mb-4'>
					<label className='block text-gray-700'>Username</label>
					<input
						type='text'
						className='w-full px-3 py-2 border rounded'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-gray-700'>Password</label>
					<input
						type='password'
						className='w-full px-3 py-2 border rounded'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button
					type='submit'
					className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
				>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignUp;
