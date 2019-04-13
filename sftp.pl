#!/usr/bin/expect -f
#

set force_conservative 0  ;# set to 1 to force conservative mode even if
			  ;# script wasn't run conservatively originally
if {$force_conservative} {
	set send_slow {1 .1}
	proc send {ignore arg} {
		sleep .1
		exp_send -s -- $arg
	}
}

set username [lindex $argv 0];
set password [lindex $argv 1];
set timeout -1
spawn adduser $username;
match_max 100000
expect -exact "New password: "
send -- $password;
send -- "\r"
expect -exact "\r
Retype new password: "
send -- $password;
send -- "\r"
expect -exact "Full Name \[\]: "
send -- "\r"
expect -exact "\r
	Room Number \[\]: "
send -- "\r"
expect -exact "\r
	Work Phone \[\]: "
send -- "\r"
expect -exact "\r
	Home Phone \[\]: "
send -- "\r"
expect -exact "\r
	Other \[\]: "
send -- "\r"
expect -exact "\r
Is the information correct? \[Y/n\] "
send -- "y\r"
send_user "$username $password"
expect eof
