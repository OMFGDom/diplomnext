interface IHeading {
	title: string
}

export function Heading({ title }: IHeading) {
	return (
		<div className='mb-[20px]'>
			<h1 className='text-2xl text-[#2F345C] font-semibold'>{title}</h1>
		</div>
	)
}
