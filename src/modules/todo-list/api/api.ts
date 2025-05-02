import { queryOptions } from '@tanstack/react-query'
import { api } from '../../../shared/api/axios'

export type TodoDto = {
	id: string
	text: string
	done: boolean
	userId: string
}

export const todoListApi = {
	baseKey: 'tasks',

	getTodoList: async ({
		signal,
	}: {
		signal: AbortSignal
	}): Promise<TodoDto[]> => {
		const { data } = await api.get<TodoDto[]>('/tasks', { signal })
		return data
	},

	getTodoListQueryOptions: () => {
		return queryOptions({
			queryKey: [todoListApi.baseKey, 'list'],
			queryFn: meta => todoListApi.getTodoList({ signal: meta.signal }),
		})
	},

	createTodo: async (todo: TodoDto) => {
		const { data } = await api.post('/tasks', todo)
		return data
	},

	updateTodo: async (todo: Partial<TodoDto> & { id: string }) => {
		const { data } = await api.patch(`/tasks/${todo.id}`, todo)
		return data
	},

	deleteTodo: async (id: string) => {
		return await api.delete(`/tasks/${id}`)
	},
}
