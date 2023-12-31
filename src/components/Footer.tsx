import { AiFillGithub } from 'react-icons/ai'
import { BiLinkExternal } from 'react-icons/bi'
import { FaShuffle } from 'react-icons/fa6'
import { repository } from '../../package.json'
import { caniuse } from '../config/caniuse'
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
      <button className="link" onClick={onRandomColorClick}>
        <FaShuffle /> Random Color
      </button>
      {separator}
      <a href={repo} target="blank">
        <AiFillGithub /> Github
      </a>
      {separator}
      <a href={caniuse} target="blank">
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
