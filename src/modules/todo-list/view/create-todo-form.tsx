import { FC } from 'react'
import { useCreateTodo } from '../model/use-create-todo'

export const CreateTodoForm: FC = () => {
	const createTodo = useCreateTodo()

	return (
		<form className='flex gap-2 mb-5' onSubmit={createTodo.handleCreate}>
			<input
				className='p-2 rounded border border-teal-500'
				type='text'
				name='text'
				title='text-todo'
			/>
			<button
				type={'submit'}
				disabled={createTodo.isLoading}
				className='p-2 rounded border border-teal-500 cursor-pointer disabled:opacity-50'
			>
				Создать
			</button>
		</form>
	)
}
