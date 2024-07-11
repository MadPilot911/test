import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthService } from '../../features/auth/AuthProvider';
import { useObservable } from '../../hooks/useObservable';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const authService = useAuthService();
	const isAuthenticated = useObservable(authService.isAuthenticated());
	const navigate = useNavigate();

	React.useEffect(() => {
		if (isAuthenticated === false) {
			navigate({ to: '/login' });
		}
	}, [isAuthenticated, navigate]);

	if (isAuthenticated === false) {
		return null;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
