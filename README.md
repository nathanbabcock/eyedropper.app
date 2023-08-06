# Eyedropper.app 💧

> Pick colors from the screen in Chromium-based browsers.

## TODO

- MVP
  - [x] Copy color to clipboard
    - [x] Automatically on click
    - [x] ...and on click of each color
  - [x] Adjust text color based on background color
  - [ ] Error screen for unsupported browsers
  - [x] Update url & browser history on color change
  - [ ] Footer actions
    - [ ] Random color
    - [ ] Github link
    - [ ] (?) Browser support
    - [ ] (?) API docs
  - [ ] Deploy to S3
- Extra
  - [x] An expanding circular animation when a new color is picked
  - [x] Pageload animation
  - [ ] Typography
  - [ ] Entrance animation for all elements
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

## EyeDropper Web API

[Browser support: caniuse.com](https://caniuse.com/mdn-api_eyedropper)

> The API doesn't let the eyedropper mode start without user intent. The EyeDropper.prototype.open() method can only be called in response to a user action (like a button click).

[source: MDN](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API#security_and_privacy_measures)
