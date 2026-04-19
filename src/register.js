document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('form');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // איסוף כל השדות
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const birthDate = document.getElementById('userBirthDate').value;
        const pass = document.getElementById('userPass').value;
        const passConfirm = document.getElementById('userPassConfirm').value;

        if (pass !== passConfirm) {
            alert('הסיסמאות שכתבת לא תואמות! נסי שוב.');
            return; 
        }

        const userDetails = {
            username: name,
            email: email,
            dob: birthDate,
            password: pass
        };

        localStorage.setItem('registeredUser', JSON.stringify(userDetails));

        alert('החשבון נוצר בהצלחה! מעביר אותך להתחברות...');
        window.location.href = './login.html';
    });
});