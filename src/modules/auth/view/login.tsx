import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../shared/redux'
import { authSlice } from '../model/auth.slice'
import { loginThunk, useLoginLoading } from '../model/login-thunk'

export const Login: FC = () => {
	const dispatch = useAppDispatch()

	const isLoading = useLoginLoading()
	const loginError = useAppSelector(authSlice.selectors.loginError)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		dispatch(
			loginThunk(
				formData.get('login')?.toString() ?? '',
				formData.get('password')?.toString() ?? ''
			)
		)
	}

	return (
		<div className='p-5 border border-slate-500 rounded-lg max-w-[600px] mx-auto mt-10'>
			<form className='flex flex-col gap-5' onSubmit={handleSubmit}>
				<h1 className='text-bold text-xl'>Логин</h1>
				<input
					className='p-5 rounded border border-slate-500'
					type='text'
					name='login'
					title='login'
					placeholder='Login'
				/>
				<input
					className='p-5 rounded border border-slate-500'
					type='password'
					name='password'
					title='password'
					placeholder='Password'
				/>
				{loginError && (
					<p className='bg-rose-400 text-white p-3 rounded'>{loginError}</p>
				)}
				<button
					type={'submit'}
					disabled={isLoading}
					className='p-5 rounded bg-teal-500 text-white cursor-pointer disabled:bg-teal-300'
				>
					Вход
				</button>
			</form>
		</div>
	)
}
