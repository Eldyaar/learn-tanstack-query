import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FC } from 'react'
import { TodoList } from '../modules/todo-list/todo-list'
import { queryClient } from '../shared/api/query-client'

export const App: FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<TodoList />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
