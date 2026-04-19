document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('form');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem('allUsers')) || [];

        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const birthDate = document.getElementById('userBirthDate').value;
        const pass = document.getElementById('userPass').value;
        const passConfirm = document.getElementById('userPassConfirm').value;

        if (pass !== passConfirm) {
            alert('הסיסמאות לא תואמות!');
            return;
        }

        const role = users.length === 0 ? 'admin' : 'user';

        const newUser = {
            username: name,
            email: email,
            dob: birthDate,
            password: pass,
            role: role 
        };

        users.push(newUser);
        localStorage.setItem('allUsers', JSON.stringify(users));

        alert(`נרשמת בהצלחה בתור ${role}!`);
        window.location.href = './login.html';
    });
});