// src/features/todo/TodoProvider.tsx
import React, { createContext } from 'react';
import { container } from 'tsyringe';
import TodoService from '../../core/services/TodoService';

const todoService = container.resolve(TodoService);

const TodoContext = createContext<TodoService | null>(null);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <TodoContext.Provider value={todoService}>{children}</TodoContext.Provider>;
};

export function useTodoService(): TodoService {
	return container.resolve(TodoService);
}
