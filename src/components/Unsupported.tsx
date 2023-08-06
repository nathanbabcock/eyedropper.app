import { caniuse } from '../config/caniuse'

export function Unsupported() {
  return (
    <p>
      The{' '}
      <a href={caniuse} target="blank">
        EyeDropper Web API
      </a>{' '}
      is not supported in your browser.
    </p>
  )
}
