// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    minWidth: 500,
    minHeight: 420,
    webPreferences: {
      // contextIsolation: true, // TODO: refactor to use this
      preload: path.join(__dirname, 'preload.js')
    },
    show: false,
    icon: path.join(__dirname, '/images/icon-256.png')
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  mainWindow.once('ready-to-show', () => { mainWindow.show() })

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

ipcMain.handle('get-current-directory', (event, args) => {
  const rootContents = fs.readdirSync('/')
  console.log('cooool!', event, args, rootContents)
  return rootContents
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
