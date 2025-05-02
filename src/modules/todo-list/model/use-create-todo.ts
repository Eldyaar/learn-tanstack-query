import { useMutation, useQueryClient } from '@tanstack/react-query'
import { nanoid } from 'nanoid'
import { todoListApi } from '../api/api'

export const useCreateTodo = () => {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationFn: todoListApi.createTodo,
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] })
		},
	})

	const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const text = String(formData.get('text') ?? '')

		mutate({
			id: nanoid(),
			done: false,
			text,
			userId: '1',
		})

		e.currentTarget.reset()
	}

	return { handleCreate, isPending }
}
