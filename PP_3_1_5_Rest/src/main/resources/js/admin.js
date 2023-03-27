const panel = document.getElementById("admin-navbar");
const addForm = document.getElementById("newUserForm");
const url = 'http://localhost:9090/api/users/';
const urlForPanel = 'http://localhost:9090/api/user';
let table = document.getElementById("all-users-table");

function showAdminPanel() {
    fetch(urlForPanel)
        .then((res) => res.json())
        .then((user) => {
            panel.innerHTML = `<b>${user.username}</b>  with roles: ${user.roles.map(role => role.role.replaceAll("ROLE_", "")).join(', ')}`
        });
}
showAdminPanel();

const renderPosts = (users) => {
    let temp = '';
    users.forEach((user) => {
        temp += `<tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.surname}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${user.username}</td>
                            <td>${user.roles.map(role => role.role.replaceAll("ROLE_", "")).join(', ')}</td>
                            <td>
                                <button type="button" class="btn btn-info"   
                                data-bs-toggle="modal" data-bs-target="#modalEdit"
                                onclick="editModal(${user.id})">Edit</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" 
                                data-bs-toggle="modal" data-bs-target="#modalDelete" 
                                onclick="deleteModal(${user.id})">Delete</button>
                            </td>
                        </tr> `;
        table.innerHTML = temp;
    })
}

function getAllUsers() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderPosts(data)
        })
}
getAllUsers()

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let nameValue = document.getElementById("name").value;
    let lastNameValue = document.getElementById("surname").value;
    let ageValue = document.getElementById("age").value;
    let emailValue = document.getElementById("email").value;
    let usernameValue = document.getElementById("username").value;
    let passwordValue = document.getElementById("password").value;
    var value = $('#newRole').val();
    let roles = getRoles(Array.from(value));
    let newUser = {
        name: nameValue,
        surname: lastNameValue,
        age: ageValue,
        email: emailValue,
        username: usernameValue,
        password: passwordValue,
        roles: roles
    }
    fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(newUser)
    }).then(data => {
        const dataArr = [];
        dataArr.push(data);
        getAllUsers();
    }).then(() => {
        addForm.reset();
        document.getElementById("users-table").click();
    })
})

function getRoles(selectedRoles) {
    let roles = [];
    if (selectedRoles.indexOf("ADMIN") >= 0) {
        roles.push({
            "id": 1,
            "role": "ROLE_ADMIN",
            "users": null,
            "authority": "ROLE_ADMIN"
        });
    }
    if (selectedRoles.indexOf("USER") >= 0) {
        roles.push({
            "id": 2,
            "role": "ROLE_USER",
            "users": null,
            "authority": "ROLE_USER"
        });
    }
    return roles;
}

async function deleteUser() {
    await fetch(url + document.getElementById('deleteId').value, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Referer': null
        },
        body: JSON.stringify(document.getElementById('deleteId').value)
    })
    getAllUsers();
    document.getElementById("deleteFormCloseButton").click();
        //document.getElementById("users-table").click();
}
function deleteModal(id) {
    fetch(url  + id, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(us => {
            document.getElementById('deleteId').value = us.id;
            document.getElementById('deleteFirstName').value = us.name;
            document.getElementById('deleteLastName').value = us.surname;
            document.getElementById('deleteAge').value = us.age;
            document.getElementById('deleteEmail').value = us.email;
            document.getElementById('deleteRoles').value = us.role;
        })
    });
}

const formDelete = document.getElementById("formDelete");
formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    deleteUser();
})

function editModal(id) {
    fetch(url  + id, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(us => {
            document.getElementById('editId').value = us.id;
            document.getElementById('editFirstName').value = us.name;
            document.getElementById('editLastName').value = us.surname;
            document.getElementById('editAge').value = us.age;
            document.getElementById('editEmail').value = us.email;
            document.getElementById('editUsername').value = us.username;
            document.getElementById('editPassword').value = us.password;
            document.getElementById('editRoles').value = us.role;
        })
    });
}

const formEdit = document.getElementById("formEdit");
formEdit.addEventListener('submit', (e) => {
    e.preventDefault();
    editUser();
})

async function editUser() {
    let idValue = document.getElementById("editId").value;
    let nameValue = document.getElementById("editFirstName").value;
    let lastNameValue = document.getElementById("editLastName").value;
    let ageValue = document.getElementById("editAge").value;
    let emailValue = document.getElementById("editEmail").value;
    let usernameValue = document.getElementById("editUsername").value;
    let passwordValue = document.getElementById("editPassword").value;
    var value = $('#editRoles').val();
    let roles = getRoles(Array.from(value));

    let user = {
        id: idValue,
        name: nameValue,
        surname: lastNameValue,
        age: ageValue,
        email: emailValue,
        username: usernameValue,
        password: passwordValue,
        roles: roles
    }
    await fetch(url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(user)
    });
    getAllUsers()
    document.getElementById("editFormCloseButton").click();
}

const tableUser = document.getElementById("data-user");
const urlForUserTable = 'http://localhost:9090/api/user';
const userInfoBtn = document.getElementById("user-nav-link");

userInfoBtn.addEventListener('click', () => {
    // cкрыть текущую панель
    const currentPanel = document.getElementById("v-pills-admin");
    currentPanel.style.display = 'none';

    // показать нужную панель
    const newPanel = document.getElementById("user-panel");
    newPanel.style.display = 'block';

    fetch(urlForUserTable)
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
            tableUser.innerHTML = row;
        });
});

const adminPanelBtn = document.getElementById("admin-panel-btn");
adminPanelBtn.addEventListener('click', handleClick);

function handleClick() {
    // скрыть текущую панель
    const currentPanel = document.getElementById("user-panel");
    currentPanel.style.display = 'none';

    // показать нужную панель
    const newPanel = document.getElementById("v-pills-admin");
    newPanel.style.display = 'block';
    adminPanelBtn.setAttribute('aria-selected', 'true');
}

