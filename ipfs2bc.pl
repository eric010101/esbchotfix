#!/usr/bin/expect -f
#
# This Expect script was generated by autoexpect on Sat Dec  8 17:15:38 2018
# Expect and autoexpect were both written by Don Libes, NIST.
#
# Note that autoexpect does not guarantee a working script.  It
# necessarily has to guess about certain things.  Two reasons a script
# might fail are:
#
# 1) timing - A surprising number of programs (rn, ksh, zsh, telnet,
# etc.) and devices discard or ignore keystrokes that arrive "too
# quickly" after prompts.  If you find your new script hanging up at
# one spot, try adding a short sleep just before the previous send.
# Setting "force_conservative" to 1 (see below) makes Expect do this
# automatically - pausing briefly before sending each character.  This
# pacifies every program I know of.  The -c flag makes the script do
# this in the first place.  The -C flag allows you to define a
# character to toggle this mode off and on.

set force_conservative 0  ;# set to 1 to force conservative mode even if
			  ;# script wasn't run conservatively originally
if {$force_conservative} {
	set send_slow {1 .1}
	proc send {ignore arg} {
		sleep .1
		exp_send -s -- $arg
	}
}

#
# 2) differing output - Some programs produce different output each time
# they run.  The "date" command is an obvious example.  Another is
# ftp, if it produces throughput statistics at the end of a file
# transfer.  If this causes a problem, delete these patterns or replace
# them with wildcards.  An alternative is to use the -p flag (for
# "prompt") which makes Expect only look for the last line of output
# (i.e., the prompt).  The -P flag allows you to define a character to
# toggle this mode off and on.
#
# Read the man page for more info.
#
# -Don


set timeout -1
spawn npm init
match_max 100000
expect -exact "This utility will walk you through creating a package.json file.\r
It only covers the most common items, and tries to guess sensible defaults.\r
\r
See `npm help json` for definitive documentation on these fields\r
and exactly what they do.\r
\r
Use `npm install <pkg>` afterwards to install a package and\r
save it as a dependency in the package.json file.\r
\r
Press ^C at any time to quit.\r
\[1G\[0Jpackage name: (ipfs2bc) \[25G"
send -- "\r"
expect -exact "\r\r
\[1G\[0Jversion: (1.0.0) \[18G"
send -- "\r"
expect -exact "\r\r
\[1G\[0Jdescription: \[14G"
send -- "\r"
expect -exact "\r\r
\[1G\[0Jentry point: (index.js) \[25G"
send -- "ipfs2bc_index.js\r"
expect -exact "ipfs2bc_index.js\r\r
\[1G\[0Jtest command: \[15G"
send -- "\r"
expect -exact "\r\r
\[1G\[0Jgit repository: \[17G"
send -- "\r"
expect -exact "\r\r
\[1G\[0Jkeywords: \[11G"
send -- "\r"
expect -exact "\r\r
\[1G\[0Jauthor: \[9G"
send -- "\r"
expect -exact "\r\r
\[1G\[0Jlicense: (ISC) \[16G"
send -- "\r"
expect -exact "\r\r
About to write to /root/ipfs2bc/package.json:\r
\r
{\r
  \"name\": \"ipfs2bc\",\r
  \"version\": \"1.0.0\",\r
  \"description\": \"\",\r
  \"main\": \"ipfs2bc_index.js\",\r
  \"scripts\": {\r
    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\r
  },\r
  \"author\": \"\",\r
  \"license\": \"ISC\"\r
}\r
\r
\r
\[1G\[0JIs this OK? (yes) \[19G"
send -- "\r"
expect eof
