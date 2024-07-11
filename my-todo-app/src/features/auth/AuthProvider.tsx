import React, { createContext, useContext, ReactNode } from 'react';
import { container } from 'tsyringe';
import AuthService from '../../core/services/AuthService';

const authService = container.resolve(AuthService);

const AuthContext = createContext(authService);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	return <AuthContext.Provider value={authService}>{children}</AuthContext.Provider>;
};

export const useAuthService = () => useContext(AuthContext);
