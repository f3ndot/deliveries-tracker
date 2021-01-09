const { PROVIDERS, getTrackingData } = require('./providers');
const { ipcRenderer } = require('electron');

window.ipcRenderer = ipcRenderer;

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  getTrackingData('canada_post', 'some_tracking_number');

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
