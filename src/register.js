document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('form');
    const challengeDisplay = document.getElementById('arithmetic-challenge');
    const refreshBtn = document.getElementById('refresh-arithmetic-captcha');
    const registerMessage = document.getElementById('register-message');
    
    let arithmeticExpectedAnswer;

    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operators = ['+', '-'];
        const operator = operators[Math.floor(Math.random() * operators.length)];
        
        challengeDisplay.textContent = `${num1} ${operator} ${num2} = ?`;
        
        if (operator === '+') arithmeticExpectedAnswer = num1 + num2;
        else arithmeticExpectedAnswer = num1 - num2;
        
        document.getElementById('captcha-answer').value = ""; 
    }

    generateCaptcha();
    refreshBtn.addEventListener('click', generateCaptcha);

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const birthDate = document.getElementById('userBirthDate').value;
        const pass = document.getElementById('userPass').value;
        const passConfirm = document.getElementById('userPassConfirm').value;
        const userAnswer = parseInt(document.getElementById('captcha-answer').value);

        if (pass !== passConfirm) {
            registerMessage.textContent = "הסיסמאות לא תואמות!";
            registerMessage.className = "text-red-500 font-bold mb-2";
            return;
        }

        if (userAnswer !== arithmeticExpectedAnswer) {
            registerMessage.textContent = "תשובת CAPTCHA שגויה. נסה שוב.";
            registerMessage.className = "text-red-500 font-bold mb-2";
            generateCaptcha(); 
            return;
        }

        try {
            window.initUsers(); 
            const isFirstUser = window.users.length === 0;

            window.add(name, email, pass, birthDate, isFirstUser);

            registerMessage.textContent = "נרשמת בהצלחה! קובץ db.json ירד למחשבך.";
            registerMessage.className = "text-green-500 font-bold mb-2";
            
            alert("שימי לב להחליף את קובץ ה-db.json בתיקיית src!");
            setTimeout(() => { window.location.href = './login.html'; }, 2000);

        } catch (error) {
            console.error(error);
            registerMessage.textContent = "שגיאה בתהליך הרישום.";
            registerMessage.className = "text-red-500 font-bold mb-2";
        }
    });
});