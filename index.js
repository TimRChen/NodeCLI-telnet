/**
 * @file 基于TCP的聊天程序
 * @author <huangjiandong>
 */

const net = require('net');

// 共享状态
let count = 0;
let users = {};

let server = net.createServer(function (conn) {
    count++;
    conn.setEncoding('utf8');
    let nickname;

    // 页面tip
    conn.write(
        '\n > welcome to \033[92mnode-chat\033[39m!'
        + '\n > ' + count + ' other people are connected at this time.'
        + '\n > please write your name and press enter: '
    );

    // 当用户退出时，进行广播通知
    let broadcast = (msg, exceptMyself) => {
        for (var i in users) {
            if (!exceptMyself || i != nickname) {
                users[i].write(msg);
            }
        }
    };

    // 监听用户行为作出处理
    conn.on('data', function (data) {
        // 删除回车符
        data = data.replace('\r\n', '');
        if (!nickname) {
            if (users[data]) {
                conn.write('\033[93m> nickname already in use. try again:\033[39m ');
                return;
            } else {
                nickname = data;
                // 将conn对象赋予用户，赋予用户可操作权限
                users[nickname] = conn;

                broadcast('\033[90m > ' + nickname + ' joined the room\033[39m\n');
            }
        } else {
            // 验证用户为已注册，则输入数据(data)为聊天信息
            for (var i in users) {
                if (i != nickname) {
                    broadcast('\033[96m > ' + nickname + ':\033[39m ' + data + '\n', true);
                }
            }
        }
    });


    // 当其中某个用户断开连接时，需要清除数据
    conn.on('close', function () {
        count--;
        broadcast('\033[90m > ' + nickname + ' left the room\033[39m\n');
        delete users[nickname];
    });
});

server.listen(3000, function () {
    console.log('\033[96m   server listening on *:3000\033[39m');
});