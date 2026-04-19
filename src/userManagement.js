document.addEventListener('DOMContentLoaded', () => {
    const welcomeMsg = document.getElementById('welcomeMsg');
    const tableBody = document.getElementById('usersTableBody');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        welcomeMsg.innerText = `Welcome, ${currentUser.username}`;
    }

    const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];

    allUsers.forEach(user => {
        const row = `
            <tr class="hover:bg-gray-50">
                <td class="p-3 border">${user.username}</td>
                <td class="p-3 border">${user.email}</td>
                <td class="p-3 border">${user.dob}</td>
                <td class="p-3 border">${user.role}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
});