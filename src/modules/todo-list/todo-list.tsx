import { FC } from 'react'
import { useTodoList } from './use-todo-list'

export const TodoList: FC = () => {
	const { todoItems, isLoading, error, cursor } = useTodoList()

	if (isLoading) {
		return <div>LOADING...</div>
	}

	if (error) {
		return <div>error: {JSON.stringify(error)}</div>
	}

	return (
		<div className='p-5 mx-auto max-w-[1200px] mt-10'>
			<h1 className='text-3xl font-bold underline mb-5'>TodoList</h1>
			<div className={'flex flex-col gap-4 mb-5'}>
				{todoItems?.map(todo => (
					<div key={todo.id} className='border border-slate-300 rounded p-3'>
						{todo.text}
					</div>
				))}
			</div>
			{cursor}
		</div>
	)
}
