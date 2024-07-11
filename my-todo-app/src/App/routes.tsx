import { createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ProtectedRoute from '../shared/components/ProtectedRoute';
import React from 'react';

const rootRoute = createRootRoute({
	component: () => <Outlet />,
});

const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: () => (
		<ProtectedRoute>
			<Home />
		</ProtectedRoute>
	),
});

const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: Login,
});

const signupRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/sign-up',
	component: SignUp,
});

export const router = createRouter({
	routeTree: rootRoute.addChildren([homeRoute, loginRoute, signupRoute]),
});
