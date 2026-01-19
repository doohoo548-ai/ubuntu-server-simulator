class UbuntuSimulator {
    constructor() {
        this.commands = {
            // Basic commands
            'help': () => this.showHelp(),
            'clear': () => { 
                document.querySelector('.output').innerHTML = ''; 
                return ''; 
            },
            'exit': 'Closing terminal... Refresh page to restart',
            
            // System info
            'whoami': 'itc-student',
            'pwd': '/home/itc-student',
            'hostname': 'ubuntu-server-itc',
            'uname -a': 'Linux ubuntu-server 5.15.0-76-generic x86_64',
            
            // File operations
            'ls': 'Desktop    Documents    Downloads    Music    Pictures    Videos    server.log',
            'ls -la': `total 48
drwxr-xr-x 7 itc-student itc-student 4096 Jun 15 10:30 .
drwxr-xr-x 3 root        root        4096 Jun 10 09:00 ..
-rw-r--r-- 1 itc-student itc-student  220 Jun 10 09:00 .bash_logout
-rw-r--r-- 1 itc-student itc-student 3771 Jun 10 09:00 .bashrc
drwx------ 2 itc-student itc-student 4096 Jun 15 10:00 .cache
drwxr-xr-x 3 itc-student itc-student 4096 Jun 15 10:30 project`,
            'touch file.txt': 'Created file.txt',
            'mkdir folder': 'Created directory "folder"',
            'rm file.txt': 'Removed file.txt',
            
            // Network commands
            'ifconfig': `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::20c:29ff:fe12:3456  prefixlen 64  scopeid 0x20<link>
        ether 00:0c:29:12:34:56  txqueuelen 1000  (Ethernet)
        RX packets 12345  bytes 9876543 (9.4 MB)
        TX packets 8765  bytes 5432109 (5.2 MB)`,
            'ping -c 3 google.com': `PING google.com (142.250.185.78) 56(84) bytes of data.
64 bytes from 142.250.185.78: icmp_seq=1 ttl=117 time=12.3 ms
64 bytes from 142.250.185.78: icmp_seq=2 ttl=117 time=11.8 ms
64 bytes from 142.250.185.78: icmp_seq=3 ttl=117 time=12.1 ms

--- google.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms`,
            
            // Process commands
            'ps aux | head -5': `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 169716 13136 ?        Ss   08:00   0:02 /sbin/init
root         2  0.0  0.0      0     0 ?        S    08:00   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        I<   08:00   0:00 [rcu_gp]
root         4  0.0  0.0      0     0 ?        I<   08:00   0:00 [rcu_par_gp]`,
            'top -n 1': `top - 10:30:45 up 2 days,  4:20,  1 user,  load average: 0.12, 0.15, 0.18
Tasks: 215 total,   1 running, 214 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.3 us,  0.8 sy,  0.0 ni, 96.9 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   7984.8 total,   3245.2 free,   1234.5 used,   3505.1 buff/cache`,
            
            // System info
            'df -h': `Filesystem      Size  Used Avail Use% Mounted on
udev            3.9G     0  3.9G   0% /dev
tmpfs           799M  1.2M  798M   1% /run
/dev/sda1        98G   45G   48G  49% /
tmpfs           3.9G   16M  3.9G   1% /dev/shm
tmpfs           5.0M  4.0K  5.0M   1% /run/lock`,
            'free -h': `              total        used        free      shared  buff/cache   available
Mem:           7.8Gi       1.2Gi       3.2Gi        16Mi       3.4Gi       6.2Gi
Swap:          2.0Gi       0.0Ki       2.0Gi`,
            
            // Fun commands
            'date': () => new Date().toString(),
            'cal': () => this.showCalendar(),
            'neofetch': () => this.showNeofetch(),
            'cmatrix': () => this.showMatrix(),
            'fortune': 'The best way to predict the future is to invent it. - Alan Kay',
            
            // Cambodian special
            'hello cambodia': 'សួស្តីកម្ពុជា! 🇰🇭 Welcome to ITC!',
            'itc': 'Institute of Technology of Cambodia - Excellence in Engineering Education',
            
            // Package management
            'apt update': 'Get:1 http://kh.archive.ubuntu.com focal InRelease [265 kB]',
            'sudo apt upgrade': 'Reading package lists... Building dependency tree...',
            
            // Web server
            'systemctl status nginx': `● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2023-06-15 08:00:00 UTC; 2h 30min ago`,
            
            // Git commands
            'git status': `On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean`,
            'git log --oneline -3': `a1b2c3d Update README with ITC info
e4f5g6h Add new commands to simulator
h7i8j9k Initial commit`
        };

        this.init();
    }

    init() {
        const input = document.getElementById('command-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.execute(input.value.trim());
                input.value = '';
            }
        });

        // Add command history
        this.history = [];
        this.historyIndex = -1;
    }

    showHelp() {
        return `Available Commands:
-------------------
BASIC:
  help, clear, exit, whoami, pwd

FILES:
  ls, ls -la, touch, mkdir, rm

SYSTEM:
  hostname, uname -a, df -h, free -h, ps, top

NETWORK:
  ifconfig, ping

INFORMATIVE:
  date, cal, neofetch, fortune

SPECIAL:
  hello cambodia, itc, cmatrix

SERVER:
  systemctl status nginx

GIT:
  git status, git log

Type any command to execute.`;
    }

    showCalendar() {
        const now = new Date();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        
        return `     ${month} ${year}
Su Mo Tu We Th Fr Sa
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30`;
    }

    showNeofetch() {
        return `            .-/+oossssoo+/-.               itc-student@ubuntu-server-itc
        \`:+ssssssssssssssssss+:\`           ---------------------
      -+ssssssssssssssssssyyssss+-         OS: Ubuntu 22.04.2 LTS x86_64
    .ossssssssssssssssssdMMMNysssso.       Host: VirtualBox 1.2
   /ssssssssssshdmmNNmmyNMMMMhssssss/      Kernel: 5.15.0-76-generic
  +ssssssssshmydMMMMMMMNddddyssssssss+     Uptime: 2 days, 4 hours
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    Packages: 1456 (dpkg)
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   Shell: bash 5.1.16
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   CPU: AMD Ryzen 7 5800X (8) @ 3.8GHz
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   GPU: VMware SVGA II Adapter
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   Memory: 1234MB / 7984MB
+sssshhhyNMMNyssssssssssssyNMMMysssssss+
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
 \\sssssssshNMMMyhhyyyyhdNMMMNhssssssss/
  +sssssssssdmydMMMMMMMMddddyssssssss+
   \\ssssssssssshdmNNNNmyNMMMMhssssss/
    \`.ossssssssssssssssssdMMMNysssso.\`
      -+sssssssssssssssssyyyssss+-
        \`:+ssssssssssssssssss+:\`
            .-/+oossssoo+/-.`;
    }

    showMatrix() {
        return `Matrix effect simulation...
01010100 01101000 01100101 00100000 01001101 01100001 01110100 01110010 01101001 01111000
01101000 01100001 01110011 00100000 01111001 01101111 01110101
01000110 01101111 01101100 01101100 01101111 01110111 00100000 01110100 01101000 01100101
01110111 01101000 01101001 01110100 01100101 00100000 01110010 01100001 01100010 01100010 01101001 01110100`;
    }

    execute(cmd) {
        if (!cmd) return;
        
        const output = document.querySelector('.output');
        const prompt = document.createElement('p');
        prompt.className = 'prompt';
        prompt.textContent = `itc-student@ubuntu-server:~$ ${cmd}`;
        output.appendChild(prompt);

        const response = document.createElement('pre');
        response.style.margin = '5px 0';
        response.style.color = '#33ff33';
        response.style.fontFamily = 'monospace';
        response.style.whiteSpace = 'pre-wrap';
        
        // Add to history
        this.history.push(cmd);
        this.historyIndex = this.history.length;

        if (this.commands[cmd]) {
            if (typeof this.commands[cmd] === 'function') {
                response.textContent = this.commands[cmd]();
            } else {
                response.textContent = this.commands[cmd];
            }
        } else {
            response.textContent = `Command '${cmd}' not found. Type 'help' for available commands.`;
            response.style.color = '#ff6b6b';
        }

        output.appendChild(response);
        output.scrollTop = output.scrollHeight;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.simulator = new UbuntuSimulator();
});

// Quick command buttons
function executeCommand(cmd) {
    window.simulator.execute(cmd);
}
