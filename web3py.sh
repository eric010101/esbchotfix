#!/bin/sh
sudo apt install gcc -y
sudo apt-get install python3-dev -y
sudo apt-get install libevent-dev -y
which pip3 || curl https://bootstrap.pypa.io/get-pip.py | python3
which virtualenv || pip3 install --upgrade virtualenv
sudo pip3 install virtualenv
virtualenv -p python3 ~/.venv-py3
source ~/.venv-py3/bin/activate
sudo pip3 install --upgrade pip setuptools
sudo pip3 install --upgrade web3
