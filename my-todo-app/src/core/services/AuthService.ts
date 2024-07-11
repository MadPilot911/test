import { BehaviorSubject, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { injectable } from 'tsyringe';

interface User {
	username: string;
	password: string;
}

@injectable()
class AuthService {
	private users: User[] = []; // Array to store registered users
	private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
	private readonly AUTH_KEY = 'auth_token';

	constructor() {
		// Initialize authentication state from localStorage
		const isAuthenticated = localStorage.getItem(this.AUTH_KEY) === 'true';
		this.isAuthenticatedSubject.next(isAuthenticated);
	}

	login(username: string, password: string) {
		return of({ username }).pipe(
			delay(1000), // Mock delay to simulate API call
			map(({ username }) => {
				const matchedUser = this.users.find(
					(u) => u.username === username && u.password === password
				);
				if (matchedUser) {
					// Set authentication state to true
					this.isAuthenticatedSubject.next(true);
					// Persist authentication state in localStorage
					localStorage.setItem(this.AUTH_KEY, 'true');
					return true;
				}
				return false;
			})
		);
	}

	signup(username: string, password: string) {
		// Check if username is already taken
		const userExists = this.users.some((u) => u.username === username);
		if (userExists) {
			return of(false); // Username already taken
		}
		this.users.push({ username, password });

		return of(true).pipe(
			delay(1000), // Mock delay to simulate API call
			map(() => {
				// Assume successful registration for demonstration
				this.isAuthenticatedSubject.next(true);
				// Persist authentication state in localStorage
				localStorage.setItem(this.AUTH_KEY, 'true');
				return true;
			})
		);
	}

	logout() {
		// Set authentication state to false
		this.isAuthenticatedSubject.next(false);
		// Clear authentication state from localStorage
		localStorage.removeItem(this.AUTH_KEY);
	}

	isAuthenticated() {
		return this.isAuthenticatedSubject.asObservable();
	}
}

export default AuthService;
