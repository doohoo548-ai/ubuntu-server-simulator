#!/bin/bash

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run with sudo: sudo $0"
    exit 1
fi

# System updates
apt update
apt upgrade -y

# Install essential tools
apt install -y \
    curl \
    wget \
    git \
    vim \
    nano \
    htop \
    tree \
    net-tools \
    python3 \
    python3-pip \
    openssh-server

# Remove existing user/group if they exist
pkill -u itcuser 2>/dev/null
userdel -r itcuser 2>/dev/null
groupdel itc 2>/dev/null

# Create group and user
groupadd itc
useradd -m -s /bin/bash -g itc itcuser

# Set password (8+ characters)
echo "itcuser:Ubuntu@2024" | chpasswd

# Add to sudo
usermod -aG sudo itcuser

# Create project structure
mkdir -p /home/itcuser/{projects,backups,logs,temp}

# Set permissions
chown -R itcuser:itc /home/itcuser/
chmod 755 /home/itcuser/projects
chmod 700 /home/itcuser/backups
chmod 777 /home/itcuser/temp

# Create log directory
mkdir -p /var/log/itc
chown itcuser:itc /var/log/itc
chmod 775 /var/log/itc

# Create SSH directory
mkdir -p /home/itcuser/.ssh
chown itcuser:itc /home/itcuser/.ssh
chmod 700 /home/itcuser/.ssh

echo "Setup completed successfully"
echo "Username: itcuser"
echo "Password: Ubuntu@2024"
echo "SSH: ssh itcuser@localhost"

