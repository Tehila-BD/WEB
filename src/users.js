window.file = "db.json";
window.users = []; 

window.initUsers = function() {
    let rawFile = new XMLHttpRequest(); 
    rawFile.open("GET", window.file, false); 
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) { 
            if (rawFile.status === 200 || rawFile.status === 0) { 
                let data = JSON.parse(rawFile.responseText); 
                window.users = data.users; 
                console.log("Users loaded:", window.users);
            }
        }
    };
    rawFile.send(null); 
};

window.find = function(nameOrMail) {
    if (window.users.length === 0) window.initUsers();
    return window.users.find(u => u.username === nameOrMail || u.email === nameOrMail);
};

window.updateData = function() {
    const data = { "users": window.users };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' }); 
    const url = URL.createObjectURL(blob); 
    
    const a = document.createElement('a'); 
    a.href = url;
    a.download = window.file; 
    
    document.body.appendChild(a);
    a.click(); 
    document.body.removeChild(a);
    URL.revokeObjectURL(url); 
};

window.add = function(username, email, password, dob, isAdmin) {
    window.initUsers(); 
    window.users.push({ username, email, password, dob, isAdmin }); 
    window.updateData(); 
};