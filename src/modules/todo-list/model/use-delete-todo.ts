import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoListApi } from '../api/api'

export const useDeleteTodo = () => {
	const queryClient = useQueryClient()

	const { mutate, variables, isPending } = useMutation({
		mutationFn: todoListApi.deleteTodo,
		onSettled: async () => {
			queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] })
		},
		onSuccess: async (_, deletedId) => {
			queryClient.setQueryData(
				todoListApi.getTodoListQueryOptions().queryKey,
				todos => todos?.filter(todo => todo.id !== deletedId)
			)
		},
	})

	return {
		handleDelete: mutate,
		getIsPending: (id: string) => isPending && variables === id,
	}
}
