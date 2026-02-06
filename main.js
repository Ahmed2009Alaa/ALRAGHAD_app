
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false, // إزالة إطار الويندوز الافتراضي لاستخدام شريط مخصص
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, 'icon.png') // تأكد من وجود أيقونة لاحقاً
  });

  // في حالة الرفع على سيرفر، نستخدم الرابط الخاص بك
  // win.loadURL('https://your-law-firm-server.com');
  
  // في حالة التشغيل المحلي
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
