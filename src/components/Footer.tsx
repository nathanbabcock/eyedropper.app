import { repository } from '../../package.json'
import styles from './Footer.module.css'

export type FooterProps = {
  onRandomColorClick: () => void
}

export function Footer({ onRandomColorClick }: FooterProps) {
  const repo = repository.url.replace(/\.git$/, '')
  const separator = <span className={styles.separator}>•</span>

  return (
    <footer className={styles.Footer}>
      <a href="javascript:void(0)" onClick={onRandomColorClick}>
        Random Color
      </a>
      {separator}
      <a href={repo} target="blank">
        Github
      </a>
      {separator}
      <a href="https://caniuse.com/mdn-api_eyedropper" target="blank">
        Browser Support
      </a>
      {separator}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper"
        target="blank"
      >
        API Docs
      </a>
    </footer>
  )
}
