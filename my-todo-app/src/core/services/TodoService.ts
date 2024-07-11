// src/services/TodoService.ts
import { BehaviorSubject, Observable } from 'rxjs';
import { injectable } from 'tsyringe';

interface Todo {
	id: string;
	text: string;
	completed: boolean;
}

@injectable()
class TodoService {
	private readonly TODOS_KEY = 'todos';
	private todosSubject: BehaviorSubject<Todo[]>;

	constructor() {
		const storedTodos = localStorage.getItem(this.TODOS_KEY);
		const initialTodos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];
		this.todosSubject = new BehaviorSubject<Todo[]>(initialTodos);
	}

	getTodos(): Observable<Todo[]> {
		return this.todosSubject.asObservable();
	}

	private updateLocalStorage(todos: Todo[]) {
		localStorage.setItem(this.TODOS_KEY, JSON.stringify(todos));
	}

	addTodo(text: string) {
		const newTodo: Todo = {
			id: Math.random().toString(36).substring(7),
			text,
			completed: false,
		};
		const updatedTodos = [...this.todosSubject.value, newTodo];
		this.todosSubject.next(updatedTodos);
		this.updateLocalStorage(updatedTodos);
	}

	toggleTodo(id: string) {
		const updatedTodos = this.todosSubject.value.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		this.todosSubject.next(updatedTodos);
		this.updateLocalStorage(updatedTodos);
	}

	deleteTodo(id: string) {
		const updatedTodos = this.todosSubject.value.filter((todo) => todo.id !== id);
		this.todosSubject.next(updatedTodos);
		this.updateLocalStorage(updatedTodos);
	}
}

export default TodoService;
