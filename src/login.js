document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('userEmail').value;
        const passInput = document.getElementById('userPass').value;

        const storedUserRaw = localStorage.getItem('registeredUser');

        if (!storedUserRaw) {
            alert('לא נמצא משתמש רשום במערכת. אנא הירשמי קודם.');
            return;
        }

        const storedUser = JSON.parse(storedUserRaw);

        if (emailInput === storedUser.email && passInput === storedUser.password) {
            alert(`ברוך הבא, ${storedUser.username}!`);
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '/index.html'; 
        } else {
            alert('אימייל או סיסמה שגויים. נסי שוב.');
        }
    });
});