// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

/* global L */
const map = L.map('map').setView([43.6532, -79.3832], 4)

const messagePromise = window.ipcRenderer.invoke('get-current-directory', ['foo', 'bar'])
messagePromise.then((someValue) => {
  console.log('RESPONSE!', someValue)
})

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png', {
  maxZoom: 9,
  attribution: '&copy; <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>'
}).addTo(map)

const notice = document.getElementById('js-online-offline-notice')
const dismissNoticeBtn = notice.getElementsByClassName('close')[0]

const dismissNotice = () => {
  notice.classList.remove('online')
  notice.classList.remove('offline')
}
const showOfflineNotice = () => {
  notice.getElementsByClassName('text')[0].innerHTML = 'Unable to connect to the internet. 🔌'
  notice.classList.remove('online')
  notice.classList.add('offline')
}
const showOnlineNotice = (autoDismiss = true) => {
  notice.getElementsByClassName('text')[0].innerHTML = 'Connected to internet! 🎉'
  notice.classList.remove('offline')
  notice.classList.add('online')
  if (autoDismiss) {
    setTimeout(dismissNotice, 2000)
  }
}

dismissNoticeBtn.onclick = dismissNotice
window.addEventListener('online', showOnlineNotice)
window.addEventListener('offline', showOfflineNotice)
