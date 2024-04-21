(() => {
  // Doesn't work (needs transient activation):
  // new window.EyeDropper().open().then(console.log).catch(console.error)

  const win = open('https://eyedropper.app', undefined, 'popup=1')
  setTimeout(() => win.close(), 1000)
})()

