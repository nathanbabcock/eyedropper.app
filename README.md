# Eyedropper.app 💧

<https://eyedropper.app>

## Features ✨

- 🎨 Screen color picker
- 💯% conveniently web-based; no extension or download required
- 📋 Copy to clipboard automatically
- 🤗 Open source

## EyeDropper Web API

[Browser support: caniuse.com](https://caniuse.com/mdn-api_eyedropper)

> The API doesn't let the eyedropper mode start without user intent. The EyeDropper.prototype.open() method can only be called in response to a user action (like a button click).

[source: MDN](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API#security_and_privacy_measures)

## Deployment

```bash
pnpm install
pnpm build
pnpm deploy-prod
```

**Environment**: Static site on AWS S3 with CloudFront CDN.

**Initial setup:**
[docs](https://github.com/nathanbabcock/nbabcock-toolkit/blob/master/docs/s3-static-site.md)

### Prerequisites

- Install [AWS CLI](https://aws.amazon.com/cli/)
- Add AWS credentials to [`.env`](/.env) (see [`.env.example`](/.env.example))

### Troubleshooting

- Needed to manually set the `Content-Type` of `.js` files for some reason.

## TODO 📋

> 📣 PRs Welcome! 📣

- [x] MVP
  - [x] Copy color to clipboard
    - [x] Automatically on click
    - [x] ...and on click of each color
  - [x] Adjust text color based on background color
  - [x] Error screen for unsupported browsers
  - [x] Update url & browser history on color change
  - [x] Footer actions
    - [x] Random color
    - [x] Github link
    - [x] (?) Browser support
    - [x] (?) API docs
  - [x] Deploy to S3
- Extra
  - [ ] SEO
  - [ ] Improve Lighthouse scores (`<meta>` description, cache policy, ...)
  - [ ] Mac/Linux bug: <https://github.com/WICG/eyedropper-api/issues/31>
  - [x] Improve favicon
  - [ ] Entrance animation for all elements
  - ---
  - [ ] Typography
  - [x] An expanding circular animation when a new color is picked
  - [ ] Calculate custom color variants based on selected color
  - [ ] Remember last color and preferred color format
  - [ ] Hover/active animations for main button icon
  - [ ] Update favicon SVG with selected color (?)
    - [ ] Custom SVG eyedropper
  - [ ] Responsive layout
  - [ ] Typewriter animation for hex/rgb values
  - [ ] `<noscript>` error page
  - [ ] Support `prefers-reduced-motion`
  - [ ] Show color names (HTML/pantone/brand) when applicable
  - [ ] ~~Auto open color picker on page load (optional setting)~~
