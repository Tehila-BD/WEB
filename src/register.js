document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const challengeDisplay = document.getElementById('arithmetic-challenge');
    const refreshBtn = document.getElementById('refresh-arithmetic-captcha');
    
    // שני אלמנטים נפרדים להודעות
    const captchaError = document.getElementById('captcha-error-message');
    const generalMessage = document.getElementById('register-message');
    
    let arithmeticExpectedAnswer;

    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operators = ['+', '-', '*'];
        const operator = operators[Math.floor(Math.random() * operators.length)];
        challengeDisplay.textContent = `${num1} ${operator} ${num2} = ?`;
        
        if (operator === '+') arithmeticExpectedAnswer = num1 + num2;
        else if (operator === '-') arithmeticExpectedAnswer = num1 - num2;
        else if (operator === '*') arithmeticExpectedAnswer = num1 * num2;
        
        document.getElementById('captcha-answer').value = ""; 
    }

    generateCaptcha();

    refreshBtn.addEventListener('click', () => {
        captchaError.textContent = "";
        generateCaptcha();
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = registerForm.querySelectorAll('input:not(#captcha-answer)');
        inputs.forEach(input => {
            input.classList.remove('border-red-500', 'ring-2', 'ring-red-500');
            input.classList.add('border-gray-300');
        });
        captchaError.textContent = "";
        generalMessage.textContent = "";

        const fields = {
            userName: document.getElementById('userName'),
            userEmail: document.getElementById('userEmail'),
            userPass: document.getElementById('userPass'),
            userPassConfirm: document.getElementById('userPassConfirm'),
            userBirthDate: document.getElementById('userBirthDate')
        };
        const arithmeticInput = document.getElementById('captcha-answer');
        const userAnswer = parseInt(arithmeticInput.value);

        let hasEmpty = false;
        for (let key in fields) {
            if (!fields[key].value.trim()) {
                fields[key].classList.add('border-red-500', 'ring-2', 'ring-red-500');
                hasEmpty = true;
            }
        }

        if (hasEmpty) {
            generalMessage.textContent = "נא למלא את כל השדות המסומנים באדום";
            generalMessage.className = "text-red-500 text-sm font-bold mt-4 text-center";
            return;
        }

        if (fields.userPass.value !== fields.userPassConfirm.value) {
            fields.userPass.classList.add('border-red-500', 'ring-2', 'ring-red-500');
            fields.userPassConfirm.classList.add('border-red-500', 'ring-2', 'ring-red-500');
            generalMessage.textContent = "הסיסמאות לא תואמות!";
            generalMessage.className = "text-red-500 text-sm font-bold mt-4 text-center";
            return;
        }

        if (isNaN(userAnswer) || userAnswer !== arithmeticExpectedAnswer) {
            captchaError.textContent = "תשובה חשבונית שגויה!";
            generateCaptcha(); 
            return;
        }

        try {
            if (typeof grecaptcha !== 'undefined') {
                if (grecaptcha.getResponse().length === 0) {
                    generalMessage.textContent = "נא לסמן שאינך רובוט";
                    generalMessage.className = "text-red-500 text-sm font-bold mt-4 text-center";
                    return;
                }
            }
        } catch(err) {}

        try {
            window.initUsers(); 
            window.add(fields.userName.value, fields.userEmail.value, fields.userPass.value, fields.userBirthDate.value, window.users.length === 0);

            generalMessage.textContent = "נרשמת בהצלחה! מעבר לדף התחברות...";
            generalMessage.className = "text-green-500 text-sm font-bold mt-4 text-center";
            
            setTimeout(() => { window.location.href = './login.html'; }, 2000);
        } catch (error) {
            generalMessage.textContent = "שגיאה ברישום הנתונים.";
            generalMessage.className = "text-red-500 text-sm font-bold mt-4 text-center";
        }
    });
});