const { app, BrowserWindow } = require('electron');
const path = require('path');

// 保持对window对象的全局引用，避免JavaScript对象被垃圾回收时，窗口被自动关闭
let mainWindow;

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true, // 允许在渲染进程中使用Node.js API
      contextIsolation: false
    }
  });

  // 加载应用的index.html
  mainWindow.loadFile('diff.html');

  // 打开开发者工具（可选，调试时使用）
  // mainWindow.webContents.openDevTools();

  // 当window被关闭时，触发下面的事件
  mainWindow.on('closed', function () {
    // 取消引用window对象，通常如果应用支持多窗口，
    // 会将window对象存储在数组中，
    // 在这个时候应该删除相应的元素
    mainWindow = null;
  });
}

// 当Electron完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(createWindow);

// 所有窗口关闭时退出应用
app.on('window-all-closed', function () {
  // 在macOS上，除非用户用Cmd + Q确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口
  if (mainWindow === null) createWindow();
});