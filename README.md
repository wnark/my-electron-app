总结我们所做的所有步骤：

- 我们启动了一个Node.js程序，并将Electron添加为依赖。

- 我们创建了一个 main.js 脚本来运行我们的主要进程，它控制我们的应用程序 并且在 Node.js 环境中运行。 在此脚本中， 我们使用 Electron 的 app 和 BrowserWindow 模块来创建一个浏览器窗口，在一个单独的进程(渲染器)中显示网页内容。

- 为了访问渲染器中的Node.js的某些功能，我们在 BrowserWindow 的构造函数上附加了一个预加载脚本。