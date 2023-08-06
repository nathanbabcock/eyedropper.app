# Eyedropper.app 💧

> Pick colors from anywhere on your screen in Chromium-based browsers.

## TODO

- [x] Copy color to clipboard
  - [x] Automatically on click
  - [x] ...and on click of each color
- [ ] Error screen for unsupported browsers
- [ ] Remember last color and preferred color format
- [x] Update url & browser history on color change
- [ ] Footer actions
  - [ ] Random color
  - [ ] Github
  - [ ] (?) Browser support
  - [ ] (?) API docs
- Ideas
  - [x] An expanding circular animation when a new color is picked
  - [ ] ~~Auto open color picker on page load (optional setting)~~
  - [ ] Show color names (HTML/pantone/brand) when applicable
  - [x] Pageload animation

## EyeDropper Web API

[Browser support: caniuse.com](https://caniuse.com/mdn-api_eyedropper)

> The API doesn't let the eyedropper mode start without user intent. The EyeDropper.prototype.open() method can only be called in response to a user action (like a button click).

[source: MDN](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API#security_and_privacy_measures)
