const apiUser = 'http://localhost:3000/users';



const form = document.getElementById('formRegister');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleRegister()
});

function handleRegister(){
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const cofirmPassword = document.getElementById('confirm-password');
    const error = document.getElementById('errorPassword');
    if(password.value !== cofirmPassword.value){
        
        error.style.display = "block";
        error.innerHTML = 'Mat khau khong khop'
        password.value='';
        cofirmPassword.value= '';
        return
    }else{
        error.style.display="none";
    }

    const newId = Date.now() + Math.floor(Math.random() * 1000);
    const user={
        id: newId,
        username: name.value,
        password: password.value,
        phone: phone.value,
        roleId: 2,
        email: email.value
    }
    createRegister(user)
}

function createRegister(data) {
    fetch(apiUser, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        console.log('User added:', data);
        window.location.href = '/projectWeb/page/login/login.html'; // Chuyển hướng đến trang đăng nhập
        document.getElementById('formRegister').reset(); // Làm mới form
    })
}