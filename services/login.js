let apiUser ='  http://localhost:3000/users';

const form = document.getElementById('formLogin');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    getUser(handleLogin);
});
function getUser(callback){
    fetch(apiUser)
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json(); 
        })
        .then(users => callback(users)) 
        .catch(error => {
            console.error('Error fetching users:', error);
            alert('Lỗi khi tải thông tin người dùng.');
        });
}

function handleLogin(users){
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let userFound = false;
    users.forEach(user => {
        if(user.email === email.value && user.password === password.value){
            userFound = true;
            window.location.href= '/projectWeb/page/home/home.html';
        }
        
    });
}