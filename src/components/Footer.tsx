import { AiFillGithub } from 'react-icons/ai'
import { BiLinkExternal } from 'react-icons/bi'
import { FaShuffle } from 'react-icons/fa6'
import { repository } from '../../package.json'
import { separatorChar } from '../util/separator'
import styles from './Footer.module.css'

export type FooterProps = {
  onRandomColorClick: () => void
}

export function Footer({ onRandomColorClick }: FooterProps) {
  const repo = repository.url.replace(/\.git$/, '')
  const separator = <span className={styles.separator}>{separatorChar}</span>

  return (
    <footer className={styles.Footer}>
      <a href="javascript:void(0)" onClick={onRandomColorClick}>
        <FaShuffle /> Random Color
      </a>
      {separator}
      <a href={repo} target="blank">
        <AiFillGithub /> Github
      </a>
      {separator}
      <a href="https://caniuse.com/mdn-api_eyedropper" target="blank">
        Browser Support <BiLinkExternal />
      </a>
      {separator}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper"
        target="blank"
      >
        API Docs <BiLinkExternal />
      </a>
    </footer>
  )
}
