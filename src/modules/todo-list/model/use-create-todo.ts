import { useAppDispatch } from '../../../shared/redux'
import { createTodoThunk, useCreateLoading } from './create-todo-thunk'

export const useCreateTodo = () => {
	const appDispatch = useAppDispatch()
	const isLoading = useCreateLoading()

	const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const text = String(formData.get('text') ?? '')

		if (text.trim() === '') {
			alert('Поле не может быть пустым')
			return
		}

		appDispatch(createTodoThunk(text))

		e.currentTarget.reset()
	}

	return { handleCreate, isLoading }
}
