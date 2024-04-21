import clsx from 'clsx'
import CopyIcon from '../assets/copy.svg?react'
import styles from './CopyButton.module.css'

export type CopyButtonProps = {
  children: string
  copied?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function CopyButton({ children, copied, ...props }: CopyButtonProps) {
  return (
    <button
      className={clsx(styles.CopyButton, copied && styles.hover)}
      {...props}
    >
      <span className={styles.text}>{children}</span>
      <div className={styles.action}>
        {copied ? <span className={styles.copied}>COPIED</span> : <CopyIcon />}
      </div>
    </button>
  )
}
