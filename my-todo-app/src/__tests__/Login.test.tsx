import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import authService from '../services/authService';
import { of, throwError } from 'rxjs';

// Mock the authService.login method
jest.mock('../services/authService', () => ({
	login: jest.fn(),
}));

describe('Login Component', () => {
	test('shows error on failed login', async () => {
		// Mock the login method to return an error
		(authService.login as jest.Mock).mockReturnValueOnce(
			throwError('Invalid username or password')
		);

		render(
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		);

		fireEvent.change(screen.getByPlaceholderText(/username/i), {
			target: { value: 'testuser' },
		});
		fireEvent.change(screen.getByPlaceholderText(/password/i), {
			target: { value: 'wrongpassword' },
		});
		fireEvent.click(screen.getByText(/login/i));

		const errorMessage = await screen.findByText(/invalid username or password/i);
		expect(errorMessage).toBeInTheDocument();
	});
});
