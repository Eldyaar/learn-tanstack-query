import { MutationObserver, useMutation } from '@tanstack/react-query'
import { nanoid } from 'nanoid'
import { queryClient } from '../../../shared/api/query-client'
import { AppThunk } from '../../../shared/redux'
import { authApi } from '../../auth/api/api'
import { authSlice } from '../../auth/model/auth.slice'
import { TodoDto, todoListApi } from '../api/api'

export const createTodoThunk =
	(text: string): AppThunk =>
	async (dispatch, getState) => {
		const userId = authSlice.selectors.userId(getState())

		if (!userId) {
			throw new Error('Пользователь не авторизован')
		}

		const user = await queryClient.fetchQuery(authApi.getUserById(userId))

		const newTodo: TodoDto = {
			id: nanoid(),
			text: `${text}. Owner: ${user.login}`,
			done: false,
			userId,
		}

		queryClient.cancelQueries({ queryKey: [todoListApi.baseKey] })

		const prevTasks = queryClient.getQueryData(
			todoListApi.getTodoListQueryOptions().queryKey
		)

		queryClient.setQueryData(
			todoListApi.getTodoListQueryOptions().queryKey,
			tasks => [...(tasks ?? []), newTodo]
		)

		try {
			await new MutationObserver(queryClient, {
				mutationFn: todoListApi.createTodo,
			}).mutate(newTodo)
		} catch (e) {
			queryClient.setQueryData(
				todoListApi.getTodoListQueryOptions().queryKey,
				prevTasks
			)
		} finally {
			queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] })
		}
	}

export const useCreateLoading = () =>
	useMutation({ mutationKey: ['create-todo'] }).isPending
