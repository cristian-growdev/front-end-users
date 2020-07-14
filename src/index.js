const axios = require('axios').default;

class User {
    constructor() {
        this.name = document.getElementById('txtName');
        this.email = document.getElementById('txtEmail');
        this.age = document.getElementById('txtAge');
        this.phone = document.getElementById('txtPhone');
        this.btnRegisterUser = document.getElementById('btnRegister');

        this.getUsers();
        this.events();
    }

    events() {
        this.btnRegisterUser.onclick = (event) => this.userValidate(event);
    }

    getUsers() {
        axios.get(`http://localhost:3000/users`)
            .then((response) => {
                this.recoryUser(response.data.usersList);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    recoryUser(data) {
        for (user of data) {

            const html = this.layoutUser(user.name, user.email, user.age, user.phone, user.id);

            this.insertHtml(html);
        }

        document.querySelectorAll('.delete-user').forEach(button => {
            button.onclick = event => this.deleteUser(button.id);
        })

    }

    deleteUser(id) {
        axios.delete(`http://localhost:3000/users/${id}`)
            .then(response => {
                alert(response.data.result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    layoutUser(name, email, age, phone, id) {
        return `
        <div class='col mt-5'>
            <div class='card'>
                <div class='user-body'>
                    <h3 class='user-name'>${name}</h3>
                    <p class='user-email'>${email}</p>
                    <p class='user-age'>${age}</p>
                    <p class='user-phone'>${phone}</p>
                    <button type="button" class="btn btn-danger delete-user" id="${id}">Deletar</button>
                </div>
            </div
        </div>
        `;

    }

    userValidate(event) {
        event.preventDefault();
        if (this.name.value && this.email.value && this.age.value && this.phone.value) {
            const user = {
                name: this.name.value,
                email: this.email.value,
                age: this.age.value,
                phone: this.phone.value
            }

            this.createUser(user);

        } else {
            alert('favor, preencha todos os dados');
        }

    }


    insertHtml(html) {
        document.getElementById('usersBoard').innerHTML += html;

    }

    createUser(user) {
        axios.post(`http://localhost:3000/users`, user)
            .then((response) => {
                const html = this.layoutUser(user.name, user.email, user.age, user.phone);

                this.insertHtml(html);
            })
            .catch((error) => {
                console.log(error);
            })
    }

}

new User();