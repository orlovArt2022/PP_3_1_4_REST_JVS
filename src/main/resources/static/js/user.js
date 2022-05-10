// alert("i am ready");
// console.log(123);

const authDataUrl ="http://localhost:8080/api/users/authentication";

/////// Variables to fill table ///////
const tableBody = document.querySelector("#UserTable tbody");

/////// Variables to fill authData ///////
const authDataInfo = document.getElementById('authData');

/////// INIT ///////
document.addEventListener('DOMContentLoaded', function(){
    fillUserData();
});

function stringRoles (element) {
    let x = [];
    element.roles.forEach(role => {
        x.push(role.name.replace("ROLE_", ""));
    })
    return x.join(" ");
}

async function fillUserData() {
    let tableRow ="";
    let authDataBody='';
    await fetch (authDataUrl)
        .then(res =>res.json())
        .then(user =>{
            authDataBody = `
            <strong>
            <li class="list-inline-item">${user.email}</li>
            </strong>
            <li class="list-inline-item">with roles:</li>
            <li class="list-inline-item">${stringRoles(user)}</li>
            `;
            tableRow += `
                <tr data-id=${user.id}>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${stringRoles(user)}</td>
                </tr>
                `;
        });
    authDataInfo.innerHTML=authDataBody;
    tableBody.innerHTML=tableRow;
}

