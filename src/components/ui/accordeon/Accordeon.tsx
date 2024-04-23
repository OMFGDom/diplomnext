import { ReactNode, useState } from 'react'

interface AccordionProps {
	title: string
	children: ReactNode
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='mb-4'>
			<button
				type='button'
				className='flex items-center justify-between w-full text-left text-lg font-medium text-[#1F2150] hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
				onClick={() => setIsOpen(!isOpen)}
			>
				<span
					className='text-sm font-normal'
					style={{ fontSize: '16px', lineHeight: '24px', color: '#1F2150' }}
				>
					{title}
				</span>
				<svg
					className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M19 9l-7 7-7-7'
					></path>
				</svg>
			</button>
			<div
				className={`transition-height duration-200 ease-in-out ${isOpen ? 'max-h-96 overflow-static' : 'max-h-0 overflow-hidden'}`}
			>
				<div className='p-4'>{children}</div>
			</div>
		</div>
	)
}

export default Accordion
