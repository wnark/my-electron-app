// 主进程
// electron 模块可以用来控制应用的生命周期和创建原生流量窗口
// app，它控制您的应用的事件生命周期。
// BrowserWindow，它负责创建和管理应用的窗口。
// ipcMain 模块来进行进程间通信
const { app, BrowserWindow, ipcMain } = require('electron')

// 需在当前文件内开头引入 Node.js 的 'path' 模块
const path = require('path')

// createWindow() 函数将您的页面加载到新的 BrowserWindow 实例中：
const createWindow = () => {
    // 创建浏览窗口
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      // 这里使用了两个Node.js概念：
      // __dirname 字符串指向当前正在执行脚本的路径 (在本例中，它指向你的项目的根文件夹)。
      // path.join API 将多个路径联结在一起，创建一个跨平台的路径字符串。
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })

    // 主进程作为接收器监听
    ipcMain.handle('ping', () => 'pong')
    
    // 加载index.html
    mainWindow.loadFile('index.html')

    // 打开开发工具
    mainWindow.webContents.openDevTools()
  }

  // 这段程序将会在Electron结束初始化
  // 和创建浏览器窗口的时候调用
  // 部分API在ready 事件触发后才能使用。
  app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // 在macOS系统内，如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
  })

  // 除了macOS外，当所有窗口都被关闭的时候退出程序，因此，通常
  // 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
  // 直到用户使用Cmd + Q 明确退出 
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  // 在当前文件中你可以引入所有的主进程代码
  // 也可以拆分成几个文件，然后用require导入