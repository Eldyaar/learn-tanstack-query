import { FC } from 'react'
import { useUser } from '../../auth/model/use-user'
import { useCreateTodo } from '../model/use-create-todo'
import { useDeleteTodo } from '../model/use-delete-todo'
import { useTodoList } from '../model/use-todo-list'
import { useToggleTodo } from '../model/use-toggle-todo'

export const TodoList: FC = () => {
	const { todoItems, isLoading, error } = useTodoList()
	const createTodo = useCreateTodo()
	const deleteTodo = useDeleteTodo()
	const { toggleTodo } = useToggleTodo()
	const useQuery = useUser()

	if (isLoading) {
		return (
			<div className='text-center text-orange-400 font-bold text-2xl mt-20'>
				LOADING...
			</div>
		)
	}

	if (error) {
		return (
			<div className='text-center text-rose-500 font-bold text-2xl mt-20'>
				error: {JSON.stringify(error)}
			</div>
		)
	}

	return (
		<>
			<h1 className='text-3xl font-bold underline mb-5'>
				TodoList. {useQuery.data?.login}
			</h1>

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
		</>
	)
}
