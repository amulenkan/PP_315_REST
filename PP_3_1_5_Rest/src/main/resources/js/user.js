const url = 'http://localhost:9090/api/user';
const panel = document.getElementById("user-navbar");
const data = document.getElementById("data-user");

function userInfo() {
    fetch(url)
        .then((res) => res.json())
        .then((user) => {
            let row = '';
            row += `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.surname}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.username}</td>
            <td>${user.roles.map(role => role.role.replaceAll("ROLE_", "")).join(' ')}</td> 
            </tr>`;
            data.innerHTML = row;
            panel.innerHTML = `<b>${user.username}</b>  with roles: ${user.roles.map(role => role.role.replaceAll("ROLE_", "")).join(', ')}`
        });
}

userInfo()
