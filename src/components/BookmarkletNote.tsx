import { useEffect, useRef, useState } from 'react'
import styles from './BookmarkletNote.module.css'

export const bookmarkletLink = `javascript:alert("yo")`

export function BookmarkletNote() {
  // https://legacy.reactjs.org/blog/2019/08/08/react-v16.9.0.html#deprecating-javascript-urls
  const linkRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => linkRef.current?.setAttribute('href', bookmarkletLink))

  const [show, setShow] = useState(true)
  if (!show) return null

  return (
    <div className={styles.BookmarkletNote}>
      <span>Drag this link to your bookmarks bar:</span>

      <div className={styles.actions}>
        <span className={styles.linkWrapper}>
          <span className={styles.bracket}>《</span>
          <a ref={linkRef} className={styles.link}>
            eyedropper.app
          </a>
          <span className={styles.bracket}>》</span>
        </span>
        <button onClick={setShow.bind(null, false)}>Dismiss</button>
        {/* <button onClick={setShow.bind(null, false)}>Don't show again</button> */}
      </div>
    </div>
  )
}
