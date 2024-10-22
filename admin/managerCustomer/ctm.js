var apiUrl = 'http://localhost:3000/users';
var arr = [];

async function loadCustomer() {
    try {
        var response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        var users = await response.json();
        arr = users;
        showCtm(); 
        updateDashboard();
    } catch (error) {
        console.error('Có vấn đề với việc gọi API:', error);
    }
}

function showCtm() {
    var tableBody = document.getElementById('tble');
    tableBody.innerHTML = ''; 
    arr.forEach(user => {
        var tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${'*'.repeat(user.password.length)}</td>
        `;
        tableBody.appendChild(tr);
    });

}
document.addEventListener('DOMContentLoaded', loadCustomer);
