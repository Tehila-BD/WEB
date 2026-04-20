document.addEventListener('DOMContentLoaded', () => {
    const welcomeMsg = document.getElementById('userNameDisplay');
    const tbody = document.getElementById('usersTableBody');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && welcomeMsg) {
        welcomeMsg.innerText = `Welcome, ${currentUser.username}`;
    }

    if (typeof window.initUsers === "function") {
        window.initUsers();
    } else {
        console.error("שגיאה: הפונקציה initUsers לא נמצאה. בדקי ש-users.js נטען קודם.");
    }

    function renderTable() {
        tbody.innerHTML = ""; 
        window.users.forEach((user, index) => {
            const tr = document.createElement('tr');
            tr.className = "border-b";
            tr.setAttribute('data-index', index); 

            tr.innerHTML = `
                <td class="p-3 border cursor-pointer hover:bg-gray-50">${user.username}</td>
                <td class="p-3 border cursor-pointer hover:bg-gray-50">${user.email}</td>
                <td class="p-3 border cursor-pointer hover:bg-gray-50">${user.dob}</td>
                <td class="p-3 border font-bold text-center">${user.isAdmin ? 'Yes' : 'No'}</td>
            `;

            const cells = tr.querySelectorAll('td');
            [cells[0], cells[1], cells[2]].forEach(cell => {
                cell.ondblclick = () => startEdit(cell);
            });

            tbody.appendChild(tr);
        });
    }

    let editable = { ccell: null, cval: null };

    function startEdit(cell) {
        if (editable.ccell) return;
        editable.ccell = cell;
        editable.cval = cell.innerText;
        cell.contentEditable = true;
        cell.focus();
        cell.classList.add("bg-yellow-100");

        cell.onblur = () => finishEdit(false);
        cell.onkeydown = (e) => {
            if (e.key === "Enter") { e.preventDefault(); cell.blur(); }
            if (e.key === "Escape") { finishEdit(true); }
        };
    }

    function finishEdit(isEscape) {
        if (!editable.ccell) return;
        if (isEscape) {
            editable.ccell.innerText = editable.cval;
        } else {
            const newValue = editable.ccell.innerText.trim();
            if (newValue !== editable.cval) {
                const index = editable.ccell.parentElement.getAttribute('data-index');
                const col = editable.ccell.cellIndex;

                if (col === 0) window.users[index].username = newValue;
                if (col === 1) window.users[index].email = newValue;
                if (col === 2) window.users[index].dob = newValue;

                window.updateData(); 
                alert("הקובץ המעודכן ירד למחשבך! החליפי אותו בתיקיית src.");
            }
        }
        editable.ccell.contentEditable = false;
        editable.ccell.classList.remove("bg-yellow-100");
        editable.ccell = null;
    }

    if (window.users.length > 0) {
        renderTable();
    } else {
        fetch('./db.json').then(r => r.json()).then(data => {
            window.users = data.users;
            renderTable();
        });
    }
});