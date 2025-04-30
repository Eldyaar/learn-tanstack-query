import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { todoListApi } from './api'

export const TodoList: FC = () => {
	const [page, setPage] = useState(1)

	const {
		data: todoItems,
		error,
		isPending,
	} = useQuery({
		queryKey: ['tasks', 'list', { page }],
		queryFn: meta => todoListApi.getTodoList({ page }, meta),
		placeholderData: keepPreviousData,
	})

	if (isPending) {
		return <div>LOADING...</div>
	}

	if (error) {
		return <div>error: {JSON.stringify(error)}</div>
	}

	return (
		<div className='p-5 mx-auto max-w-[1200px] mt-10'>
			<h1 className='text-3xl font-bold underline mb-5'>TodoList</h1>
			<div className='flex flex-col gap-4 mb-5'>
				{todoItems?.data.map(todo => (
					<div key={todo.id} className='border border-slate-300 rounded p-3'>
						{todo.text}
					</div>
				))}
			</div>
			<div className='flex gap-4'>
				<button
					onClick={() => setPage(p => Math.max(p - 1, 1))}
					className='p-3 rounded border border-teal-500'
				>
					prev
				</button>
				<button
					onClick={() => setPage(p => Math.min(p + 1, todoItems.pages))}
					className='p-3 rounded border border-teal-500'
				>
					next
				</button>
			</div>
		</div>
	)
}
