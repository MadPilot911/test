// src/pages/Home.tsx
import React, { useState } from 'react';
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
	const todos = useObservable(todoService.getTodos());
	const isAuthenticated = useObservable(authService.isAuthenticated());

	const handleAddTodo = () => {
		if (text.trim()) {
			todoService.addTodo(text);
			setText('');
		}
	};

	return (
		<div className='w-full min-h-screen p-4 bg-white shadow-md rounded-md'>
			<Header />
			{isAuthenticated && (
				<>
					<TextArea
						value={text}
						onChange={(e) => setText(e.target.value)}
						size='3'
						placeholder='Add new task'
						mt='7'
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
							className='mt-4'
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
