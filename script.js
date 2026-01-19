document.getElementById("command").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        let cmd = this.value;
        let output = document.getElementById("output");
        
        // Show command
        output.innerHTML += "<p>$ " + cmd + "</p>";
        
        // Process command
        if(cmd === "help") {
            output.innerHTML += "<p>Available: help, date, ls, pwd</p>";
        } else if(cmd === "date") {
            output.innerHTML += "<p>" + new Date() + "</p>";
        } else if(cmd === "ls") {
            output.innerHTML += "<p>file1.txt  file2.txt  folder1</p>";
        } else if(cmd === "pwd") {
            output.innerHTML += "<p>/home/ubuntu</p>";
        } else {
            output.innerHTML += "<p>Command not found: " + cmd + "</p>";
        }
        
        // Clear input
        this.value = "";
    }
});
