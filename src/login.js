document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userInput = document.getElementById('userEmail').value;
        const passInput = document.getElementById('userPass').value;

        let foundUser = find(userInput); 

        if (foundUser && foundUser.password === passInput) {
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            
            alert(`שלום ${foundUser.username}`); 

            if (foundUser.isAdmin) {
                window.location.href = './userManagement.html';
            } else {
                window.location.href = '../index.html';
            }
        } else {
            alert('פרטי התחברות שגויים. נסו שוב!');
        }
    });
});