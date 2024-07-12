import { BehaviorSubject, Observable } from 'rxjs';
import { injectable, inject } from 'tsyringe';
import { map } from 'rxjs/operators';
import AuthService from './AuthService';

interface Todo {
	id: string;
	text: string;
	completed: boolean;
}

@injectable()
class TodoService {
	private authService: AuthService;
	private todosSubject: BehaviorSubject<Todo[]>;
	private defaultTodoId = 'default_todo_id';

	constructor(@inject(AuthService) authService: AuthService) {
		this.authService = authService;
		this.todosSubject = new BehaviorSubject<Todo[]>([]);

		this.authService
			.getCurrentUser()
			.pipe(map((user) => this.loadTodos(user)))
			.subscribe();
	}

	private getTodosKey(user: string | null) {
		return `todos_${user}`;
	}

	private loadTodos(user: string | null) {
		if (user) {
			const storedTodos = localStorage.getItem(this.getTodosKey(user));
			let initialTodos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];
			if (initialTodos.length === 0) {
				const defaultTodo: Todo = {
					id: this.defaultTodoId,
					text: 'This is your default todo. Add a new todo to get started!',
					completed: false,
				};
				initialTodos = [defaultTodo];
			}
			this.todosSubject.next(initialTodos);
		} else {
			this.todosSubject.next([]);
		}
	}

	getTodos(): Observable<Todo[]> {
		return this.todosSubject.asObservable();
	}

	private updateLocalStorage(user: string | null, todos: Todo[]) {
		if (user) {
			localStorage.setItem(this.getTodosKey(user), JSON.stringify(todos));
		}
	}

	addTodo(text: string) {
		this.authService
			.getCurrentUser()
			.pipe(
				map((currentUser) => {
					if (currentUser) {
						// Remove default todo if it exists
						const updatedTodos = this.todosSubject.value.filter(
							(todo) => todo.id !== this.defaultTodoId
						);

						const newTodo: Todo = {
							id: Math.random().toString(36).substring(7),
							text,
							completed: false,
						};

						updatedTodos.push(newTodo);
						this.todosSubject.next(updatedTodos);
						this.updateLocalStorage(currentUser, updatedTodos);
					}
				})
			)
			.subscribe();
	}

	toggleTodo(id: string) {
		this.authService
			.getCurrentUser()
			.pipe(
				map((currentUser) => {
					if (currentUser) {
						const updatedTodos = this.todosSubject.value.map(
							(todo) =>
								todo.id === id
									? {
											...todo,
											completed: !todo.completed,
									  }
									: todo
						);
						this.todosSubject.next(updatedTodos);
						this.updateLocalStorage(currentUser, updatedTodos);
					}
				})
			)
			.subscribe();
	}

	deleteTodo(id: string) {
		this.authService
			.getCurrentUser()
			.pipe(
				map((currentUser) => {
					if (currentUser) {
						const updatedTodos = this.todosSubject.value.filter(
							(todo) => todo.id !== id
						);
						this.todosSubject.next(updatedTodos);
						this.updateLocalStorage(currentUser, updatedTodos);
					}
				})
			)
			.subscribe();
	}
}

export default TodoService;
