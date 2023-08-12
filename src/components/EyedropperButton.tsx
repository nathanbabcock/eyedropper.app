import clsx from 'clsx'
import { ReactComponent as EyedropperIcon } from '../assets/eyedropper.svg'
import styles from './EyedropperButton.module.css'

export type EyedropperButtonProps = {
  isOpen?: boolean
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export function EyedropperButton({ isOpen, ...props }: EyedropperButtonProps) {
  return (
    <button
      className={clsx(styles.EyedropperButton, isOpen && styles.open)}
      style={{
        cursor: props.disabled ? 'not-allowed' : undefined,
      }}
      children={<EyedropperIcon />}
      aria-label="eyedropper"
      {...props}
    />
  )
}
