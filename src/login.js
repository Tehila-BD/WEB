document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('userEmail').value;
        const passInput = document.getElementById('userPass').value;

        const users = JSON.parse(localStorage.getItem('allUsers')) || [];

        const foundUser = users.find(u => u.email === emailInput && u.password === passInput);

        if (foundUser) {
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            
            alert(`שלום ${foundUser.username}`); 

            if (foundUser.role === 'admin') {
                window.location.href = './userManagement.html';
            } else {
                window.location.href = '../index.html';
            }
        } else {
            alert('אימייל או סיסמה לא נכונים. נסי שוב!');
        }
    });
}); 