const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

const iconUrl = url.format({
    pathname: path.join(__dirname, 'Icon/MYOBicon.icns'),
    protocol: 'file:',
    slashes: true
   })

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: iconUrl,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
