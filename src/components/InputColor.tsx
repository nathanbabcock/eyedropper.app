import { type HTMLProps } from 'react'
import { IoMdColorPalette } from 'react-icons/io'
import styles from './InputColor.module.css'

export type InputColorProps = HTMLProps<HTMLInputElement> & {
  labelProps?: HTMLProps<HTMLLabelElement>
  children?: never
}

export function InputColor({ labelProps, ...inputProps }: InputColorProps) {
  const inputId = 'nativeInputColor'
  return (
    <div className={styles.InputColor}>
      <input type="color" {...inputProps} id={inputId} />
      <label {...labelProps} tabIndex={0} htmlFor={inputId}>
        <IoMdColorPalette />
      </label>
    </div>
  )
}
