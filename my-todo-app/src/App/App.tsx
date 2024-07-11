import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes';
import { AuthProvider } from '../features/auth/AuthProvider';
import { TodoProvider } from '../features/todo/TodoProvider';

const App: React.FC = () => {
	return (
		<AuthProvider>
			<TodoProvider>
				<RouterProvider router={router} />
			</TodoProvider>
		</AuthProvider>
	);
};

export default App;
