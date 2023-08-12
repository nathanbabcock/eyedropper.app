import { ReactComponent as EyedropperIcon } from '../assets/eyedropper.svg'
import styles from './EyedropperButton.module.css'

export type EyedropperButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export function EyedropperButton(props: EyedropperButtonProps) {
  return (
    <button
      className={styles.EyedropperButton}
      style={{
        cursor: props.disabled ? 'not-allowed' : undefined,
      }}
      children={<EyedropperIcon />}
      {...props}
    />
  )
}
