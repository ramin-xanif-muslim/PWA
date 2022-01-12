const {injectManifest} = require('workbox-build')

let workboxConfig = {
  globDirectory: 'Desktor/PWA',
  globPatterns: [
    'favicon.ico',
    'index.html',
    '*.css',
    '*.js',
  ],
  swSrc: 'src/sw-workbox.js',
  swDest: 'Desktor/PWA/public/sw-workbox.js'
}

injectManifest(workboxConfig)
  .then(({count, size}) => {
    console.log(`Generated ${workboxConfig.swDest}, which will precache ${count} files, totaling ${size} bytes.`)
  })