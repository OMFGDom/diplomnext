import { useCallback, useEffect, useRef, useState } from 'react'

import { Portal } from '@/components/ui/portal/Portal'

import cls from './Modal.module.scss'
import { classNames } from '@/lib/classNames'

interface ModalProps {
	className?: string
	children?: React.ReactNode
	isOpen?: boolean
	onClose?: () => void
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {
	const { className, children, isOpen, onClose } = props

	const [isClosing, setIsClosing] = useState(false)
	const timerRef = useRef<ReturnType<typeof setTimeout>>()

	const closeHandler = useCallback(() => {
		if (onClose) {
			setIsClosing(true)
			timerRef.current = setTimeout(() => {
				onClose()
				setIsClosing(false)
			}, ANIMATION_DELAY)
		}
	}, [onClose])

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeHandler()
			}
		},
		[closeHandler]
	)

	const onContentClick = (e: React.MouseEvent) => {
		e.stopPropagation()
	}

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', onKeyDown)
		}
		return () => {
			clearTimeout(timerRef.current)
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen, onKeyDown])

	const mods: Record<string, boolean> = {
		[cls.opened]: !!isOpen,
		[cls.isClosing]: !!isClosing
	}

	return (
		<Portal>
			<div className={classNames(cls.Modal, mods, [className || ''])}>
				<div
					className={cls.overlay}
					onClick={closeHandler}
				>
					<div
						className={cls.content}
						onClick={onContentClick}
					>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	)
}
