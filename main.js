const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'default',
    icon: process.platform === 'darwin' 
      ? path.join(__dirname, 'assets', 'icon.icns')
      : path.join(__dirname, 'assets', 'icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  // My deployed website
  win.loadURL('https://exjobb-obsidian-frontend.netlify.app');

  // Remove menu bar
  win.setMenuBarVisibility(false);
  // Open DevTools in development
  // win.webContents.openDevTools();
}

// When Electron is ready
app.whenReady().then(() => {
  createWindow();

  // On macOS, re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});