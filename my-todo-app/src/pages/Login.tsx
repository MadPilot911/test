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
		<div className='login'>
			<input
				type='text'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder='Username'
			/>
			<input
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Password'
			/>
			<button onClick={handleLogin}>Login</button>
			{error && <p>{error}</p>}
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
	);
};

export default Login;
