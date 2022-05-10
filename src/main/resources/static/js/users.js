// alert("i am ready");
// console.log(123);

const url ="http://localhost:8080/api/users";
const urlRoles ="http://localhost:8080/api/roles";
const authDataUrl ="http://localhost:8080/api/users/authentication";

/////// Variables to fill table ///////
const homeTab= document.getElementById("home-tab");
const tableBody = document.querySelector("#UsersTable tbody");
const nameNew= document.getElementById('nameNew');
const lastNameNew= document.getElementById('lastNameNew');
const ageNew= document.getElementById('ageNew');
const emailNew= document.getElementById('emailNew');
const passwordNew= document.getElementById('passwordNew');

/////// Variables to fill select ///////
let selectRows ="";
const selectBody= document.getElementById('rolesNew');

/////// Variables to fill authData ///////
const authDataInfo = document.getElementById('authData');

/////// Variables to fill EditModal or DeleteModal ///////
const idToEdit= document.getElementById('idEdit');
const nameToEdit= document.getElementById('nameEdit');
const lastNameToEdit=document.getElementById('LastNameEdit');
const ageToEdit=document.getElementById('ageEdit');
const emailToEdit=document.getElementById('emailEdit');
const passwordToEdit=document.getElementById('passwordEdit');
const rolesToEdit=document.getElementById('rolesEdit');
const idToDelete=document.getElementById('idDelete');

/////// INIT ///////
document.addEventListener('DOMContentLoaded', function(){
    fillTable();
    fillAuthData();
    $('#modalDelete').on("hidden.bs.modal", function() {
        $(this).find('form').trigger('reset');
        document.getElementById('rolesDelete').innerHTML="";
    });

    $('#modalEdit').on("hidden.bs.modal", function() {
        $(this).find('form').trigger('reset');
        document.getElementById('rolesEdit').innerHTML="";
    });
});

/////// GET method (get all Roles) ///////
fetch (urlRoles)
    .then(res =>res.json())
    .then(data => fillSelect(data));

///////   Fill Roles Select   ///////
const fillSelect = (elements) => {
    elements.forEach(element => {
        let shortName = element.name.replace("ROLE_","");
        selectRows += `
        <option value="${element.name}">${shortName}</option>
        `;
    })
    selectBody.innerHTML=selectRows;
}

/////// GET method (get all Users and fill table) ///////
function stringRoles (element) {
    let x = [];
    element.roles.forEach(role => {
        x.push(role.name.replace("ROLE_",""));
    })
    return x.join(" ");
}

async function fillTable () {
    let tableRows ="";
    await fetch (url)
        .then(res =>res.json())
        .then(data =>data.forEach(element => {
            tableRows += `
                <tr data-id=${element.id}>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.lastName}</td>
                <td>${element.age}</td>
                <td>${element.email}</td>
                <td>${stringRoles(element)}</td>
                <td><button type="button" id = "buttonEdit" class="btn btn-info" data-toggle="modal" data-target="#modalEdit" onclick="fillEditModal()">Edit</button></td>
                <td><button type="button" id = "buttonDelete" class="btn btn-danger" data-toggle="modal" data-target="#modalDelete" onclick="fillDeleteModal()">Delete</button></td>
            </tr>
            `;
            }))
    tableBody.innerHTML=tableRows;
}

/////// GET method (get Authentication data) ///////
async function fillAuthData () {
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
        });
    authDataInfo.innerHTML=authDataBody;
}

/////// POST method (to Add User) ///////
async function addNewUser(){
    let newUser = {
        name:nameNew.value,
        lastName:lastNameNew.value,
        age:ageNew.value,
        email:emailNew.value,
        password:passwordNew.value,
        roles:[]
    }

    for (let option of selectBody.options) {
        if (option.selected) {
            await fetch (urlRoles+'/'+option.value)
                .then(res =>res.json())
                .then(role => newUser.roles.push(role));
        }
    }

      await fetch(url,{
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
        });
        fillTable();
        $('.add-user-form').trigger('reset');
        homeTab.click();
}

/////// PUT method (to Edit User) ///////
function fillEditModal() {
    const row = event.target.parentNode.parentNode;
    idToEdit.value=row.children[0].innerHTML;
    nameToEdit.value=row.children[1].innerHTML;
    lastNameToEdit.value=row.children[2].innerHTML;
    ageToEdit.value=row.children[3].innerHTML;
    emailToEdit.value=row.children[4].innerHTML;
    rolesToEdit.innerHTML=selectRows;
    document.getElementById("edit-button").addEventListener('click',editUserFunc,{once:true})
}

let editUserFunc =async function editUser(){
    console.log(idToEdit.value);
    let editUser = {
        id:idToEdit.value,
        name:nameToEdit.value,
        lastName:lastNameToEdit.value,
        age:ageToEdit.value,
        email:emailToEdit.value,
        password:passwordToEdit.value,
        roles:[]
    }

    for (let option of rolesToEdit.options) {
        if (option.selected) {
            await fetch (urlRoles+'/'+option.value)
                .then(res =>res.json())
                .then(role => editUser.roles.push(role));
        }
    }

    await fetch(url + '/' + idToEdit.value,{
        method: 'PUT',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editUser)
    });
    fillTable();
    fillAuthData();
    // $('#modalEdit').modal('hide');
    $('#modalEdit').modal('toggle');
}

/////// DELETE method (to Delete User) ///////
function fillDeleteRoles (string) {
    let deleteRows = '';
    let stringSplitted = string.split(" ");
    stringSplitted.forEach(el => {
        deleteRows += `
        <option>${el}</option>
        `;
    })
    return deleteRows;
}

function fillDeleteModal() {
    const row = event.target.parentNode.parentNode;
    idToDelete.value=row.children[0].innerHTML;
    document.getElementById('nameDelete').value=row.children[1].innerHTML;
    document.getElementById('lastnameDelete').value=row.children[2].innerHTML;
    document.getElementById('ageDelete').value=row.children[3].innerHTML;
    document.getElementById('emailsDelete').value=row.children[4].innerHTML;
    document.getElementById('rolesDelete').innerHTML=fillDeleteRoles(row.children[5].innerHTML);
    document.getElementById("delete-button").addEventListener('click',deleteUserFunc,{once: true})
}

let deleteUserFunc = async function deleteUser() {
    console.log(idToDelete.value);
    await fetch(url + '/' + idToDelete.value, {
        method: 'DELETE',
        cache: 'reload',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(idToDelete.value)
    })
    fillTable();
    $('#modalDelete').modal('toggle');
}
