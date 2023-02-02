//这个脚本使用 document.getElementById DOM 接口来替换 id 属性为 info 的 HTML 元素显示文本。
const information = document.getElementById('info')
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`
// 渲染器作为发射器发送
const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // 打印 'pong'
  }
  
  func()