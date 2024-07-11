import React from 'react';
import { Checkbox } from '@radix-ui/themes';
import { Label } from '@radix-ui/react-label';
import { useTodoService } from '../../features/todo/TodoProvider';

interface TodoItemProps {
	id: string;
	text: string;
	completed: boolean;
	num: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, num }) => {
	const todoService = useTodoService();

	const handleToggle = () => {
		todoService.toggleTodo(id);
	};

	return (
		<div className='todo-item flex items-center'>
			<Checkbox
				onCheckedChange={handleToggle}
				checked={completed}
				size='3'
				mr='3'
			></Checkbox>
			<Label className={completed ? 'line-through' : ''}>
				{`${num}. `}
				{text}
			</Label>
		</div>
	);
};

export default TodoItem;
