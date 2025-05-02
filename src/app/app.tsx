import { FC } from 'react'
import { useUser } from '../modules/auth/model/use-user'
import { Login } from '../modules/auth/view/login'
import { LogoutButton } from '../modules/auth/view/logout-button'
import { TodoList } from '../modules/todo-list/view/todo-list'

export const App: FC = () => {
	const user = useUser()

	if (user.isLoading) {
		return (
			<div className='text-center text-orange-400 font-bold text-2xl mt-20'>
				LOADING...
			</div>
		)
	}

	if (user.data) {
		return (
			<div className='p-5 mx-auto max-w-[1200px] mt-10 flex flex-col gap-2'>
				<LogoutButton />
				<TodoList />
			</div>
		)
	}

	return <Login />
}
