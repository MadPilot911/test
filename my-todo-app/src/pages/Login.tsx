import React, { useState } from 'react';
import { useAuthService } from '../features/auth/AuthProvider';
import { useNavigate } from '@tanstack/react-router';

const Login: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const authService = useAuthService();
	const navigate = useNavigate();

	const handleLogin = async () => {
		const success = await authService.login(username, password).toPromise();
		if (success) {
			navigate({ to: '/' });
		} else {
			setError('Invalid username or password');
		}
	};
	const handleSignUpClick = () => {
		navigate({ to: '/sign-up' });
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<div className='bg-white p-6 rounded-md shadow-md w-full max-w-sm'>
				<h2 className='text-2xl font-bold mb-4'>Login</h2>
				<input
					type='text'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder='Username'
					className='w-full p-2 mb-4 border rounded-md'
				/>
				<input
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Password'
					className='w-full p-2 mb-4 border rounded-md'
				/>
				<button
					onClick={handleLogin}
					className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'
				>
					Login
				</button>
				{error && <p className='mt-4 text-red-500'>{error}</p>}
				<p className='mt-4'>
					Don't have an account?{' '}
					<button
						className='text-indigo-600 hover:underline focus:outline-none'
						onClick={handleSignUpClick}
					>
						Sign Up
					</button>
				</p>
			</div>
		</div>
	);
};

export default Login;
