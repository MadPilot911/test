import React, { useState, useMemo } from 'react';
import { useObservable } from '../hooks/useObservable';
import { useTodoService } from '../features/todo/TodoProvider';
import { useAuthService } from '../features/auth/AuthProvider';
import TodoItem from '../shared/components/TodoItem';
import { Button, TextArea, Section } from '@radix-ui/themes';
import Header from '../shared/components/Header';

const Home: React.FC = () => {
	const [text, setText] = useState('');
	const todoService = useTodoService();
	const authService = useAuthService();

	const todosObservable = useMemo(() => todoService.getTodos(), [todoService]);
	const isAuthenticatedObservable = useMemo(
		() => authService.isAuthenticated(),
		[authService]
	);

	const todos = useObservable(todosObservable);
	const isAuthenticated = useObservable(isAuthenticatedObservable);

	const handleAddTodo = () => {
		if (text.trim()) {
			todoService.addTodo(text);
			setText('');
		}
	};

	return (
		<div className='w-full min-h-screen p-4 bg-gray-100 shadow-md rounded-md'>
			<Header />
			{isAuthenticated && (
				<>
					<TextArea
						value={text}
						onChange={(e) => setText(e.target.value)}
						size='3'
						placeholder='Add new task'
						className='mt-7 w-full p-2 border rounded-md'
					/>
					<Button
						mt='3'
						onClick={handleAddTodo}
					>
						Add
					</Button>
					{todos?.map((todo, num) => (
						<Section
							key={todo.id}
							size='1'
							className='mt-4 p-4 bg-white shadow-md rounded-md'
						>
							<TodoItem
								id={todo.id}
								num={num + 1}
								text={todo.text}
								completed={todo.completed}
							/>
						</Section>
					))}
				</>
			)}
		</div>
	);
};

export default Home;
