// src/services/AuthService.ts
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
	private currentUserSubject = new BehaviorSubject<string | null>(null);
	private readonly AUTH_KEY = 'auth_token';
	private readonly USER_KEY = 'current_user';

	constructor() {
		const isAuthenticated = localStorage.getItem(this.AUTH_KEY) === 'true';
		const currentUser = localStorage.getItem(this.USER_KEY);
		this.isAuthenticatedSubject.next(isAuthenticated);
		this.currentUserSubject.next(currentUser);
	}

	login(username: string, password: string) {
		return of({ username }).pipe(
			delay(1000),
			map(({ username }) => {
				const matchedUser = this.users.find(
					(u) => u.username === username && u.password === password
				);
				if (matchedUser) {
					this.isAuthenticatedSubject.next(true);
					localStorage.setItem(this.AUTH_KEY, 'true');
					localStorage.setItem(this.USER_KEY, username);
					this.currentUserSubject.next(username);
					return true;
				}
				return false;
			})
		);
	}

	signup(username: string, password: string) {
		const userExists = this.users.some((u) => u.username === username);
		if (userExists) {
			return of(false);
		}
		this.users.push({ username, password });

		return of(true).pipe(
			delay(1000),
			map(() => {
				this.isAuthenticatedSubject.next(true);
				localStorage.setItem(this.AUTH_KEY, 'true');
				localStorage.setItem(this.USER_KEY, username);
				this.currentUserSubject.next(username);
				return true;
			})
		);
	}

	logout() {
		this.isAuthenticatedSubject.next(false);
		localStorage.removeItem(this.AUTH_KEY);
		localStorage.removeItem(this.USER_KEY);
		this.currentUserSubject.next(null);
	}

	isAuthenticated() {
		return this.isAuthenticatedSubject.asObservable();
	}

	getCurrentUser() {
		return this.currentUserSubject.asObservable();
	}
}

export default AuthService;
