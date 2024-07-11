import React from 'react';
import { Button } from '@radix-ui/themes';
import { useAuthService } from '../../features/auth/AuthProvider';

const Header: React.FC = () => {
	const authService = useAuthService();

	const handleLogout = () => {
		authService.logout();
	};

	return (
		<header className='flex justify-between items-center p-4 bg-gray-800 text-white'>
			<h1 className='text-xl'>Todo App</h1>
			<Button onClick={handleLogout}>Logout</Button>
		</header>
	);
};

export default Header;
