import { FC } from 'react'
import { useAppDispatch } from '../../../shared/redux'
import { logoutThunk } from '../model/logout-thunk'

export const LogoutButton: FC = () => {
	const dispatch = useAppDispatch()

	return (
		<button
			onClick={() => dispatch(logoutThunk())}
			className='border border-rose-500 p-3 rounded max-w-[200px] cursor-pointer'
		>
			Выход
		</button>
	)
}
