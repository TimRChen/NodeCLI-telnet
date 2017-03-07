# NodeCLI-telnet
    使用TCP协议完成node服务器与telnet客户端通信的聊天程序

# 如何开始
    node index.js
    另开一个终端，输入 telnet 127.0.0.1 3000
    然后您就成功打开了一个telnet客户端，此时，它正在候命
    您可以再打开一个telnet客户端，输入您的用户名，即可发送信息，与另一个客户端进行通信

# 技术手段
    该chat程序通过TCP协议实现，使用了其net.createServer的回调函数中的实例对象connection
    通过connection实现了net.stream系列操作，完成了用户注册，数据收发，离开广播等系列功能

# 涉及小部分代码重构
    主要是broadcast函数，对代码相同功能部分进行抽离，作为独立函数
    