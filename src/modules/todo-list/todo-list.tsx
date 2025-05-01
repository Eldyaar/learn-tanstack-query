import { FC } from 'react'
import { useCreateTodo } from './use-create-todo'
import { useDeleteTodo } from './use-delete-todo'
import { useTodoList } from './use-todo-list'
import { useToggleTodo } from './use-toggle-todo'

export const TodoList: FC = () => {
	const { todoItems, isLoading, error } = useTodoList()
	const createTodo = useCreateTodo()
	const deleteTodo = useDeleteTodo()
	const { toggleTodo } = useToggleTodo()

	if (isLoading) {
		return <div>LOADING...</div>
	}

	if (error) {
		return <div>error: {JSON.stringify(error)}</div>
	}

	return (
		<div className='p-5 mx-auto max-w-[1200px] mt-10'>
			<h1 className='text-3xl font-bold underline mb-5'>TodoList</h1>

			<form className='flex gap-2 mb-5' onSubmit={createTodo.handleCreate}>
				<input
					className='p-2 rounded border border-teal-500'
					type='text'
					name='text'
					title='text-todo'
				/>
				<button
					type={'submit'}
					disabled={createTodo.isPending}
					className='p-2 rounded border border-teal-500 cursor-pointer disabled:opacity-50'
				>
					Создать
				</button>
			</form>

			<div className={'flex flex-col gap-4 mb-5'}>
				{todoItems?.map(todo => (
					<div
						key={todo.id}
						className='border border-slate-300 rounded p-3 flex justify-between'
					>
						<input
							type='checkbox'
							checked={todo.done}
							title='checkbox'
							className='cursor-pointer'
							onChange={() => toggleTodo(todo.id, todo.done)}
						/>

						{todo.text}

						<button
							type={'button'}
							disabled={deleteTodo.getIsPending(todo.id)}
							className='text-rose-500 font-bold disabled:text-rose-300 cursor-pointer'
							onClick={() => deleteTodo.handleDelete(todo.id)}
						>
							Удалить
						</button>
					</div>
				))}
			</div>
		</div>
	)
}
