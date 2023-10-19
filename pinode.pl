#!/usr/bin/expect

# 检查是否提供了正确数量的参数
if {[llength $argv] != 3} {
    puts stderr "Usage: $argv0 <account> <node_name>"
    exit 1
}

# 获取账户和节点名称参数
set account [lindex $argv 0]
set node_name [lindex $argv 1]
# 设置变量
set hostroot "/opt/eth"
set devroot "devroot"
set nodeid [lindex $argv 0]  
set port1 "2001"
set ip "localhost"
set rpcport [lindex $argv 1] 
#8543/8544/8545
set acc40 [lindex $argv 2] 

# 构造 geth 命令
if {$rpcport == "8545"} {
    set cmd "sudo /usr/bin/geth --datadir $hostroot/$devroot/$nodeid/data --networkid 1515 --port $port1 --http --http.addr '$ip' --http.port $rpcport --http.api 'admin,personal,eth,net,web3,txpool,miner' --allow-insecure-unlock --unlock $acc40 --password $hostroot/$devroot/$nodeid/password.txt --nodiscover console"
} else {
    set cmd "sudo /usr/bin/geth --datadir $hostroot/$devroot/$nodeid/data --networkid 1515 --port $port1 --http --http.addr '$ip' --http.port $rpcport --http.api 'admin,shh,personal,db,eth,net,web3,txpool,miner' --unlock $acc40 --password $hostroot/$devroot/$nodeid/password.txt --nodiscover console"
}
            #sudo geth --datadir /opt/eth/devroot/node1/data --networkid 1515 --port 2001 --http --http.addr 'localhost' --http.port 8543 --http.api 'admin,personal,eth,net,web3,txpool,miner' --allow-insecure-unlock --unlock 4f22C714E7b4B8ab889ecB364fA4802091b1ed76 --password /opt/eth/devroot/node1/password.txt --nodiscover console

# 启动 geth
spawn -noecho $cmd 2>> $hostroot/$devroot/enode_$nodeid.log

# 你可以在这里使用 send 和 expect 命令来与 geth 控制台交互
expect ">"
send "admin.nodeInfo.enode\r"
expect ">"
set results $expect_out(buffer)
send "exit\r"
expect eof
