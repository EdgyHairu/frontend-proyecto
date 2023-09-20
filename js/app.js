// Apartado para variables y constantes globales
const users = document.getElementById('users')
const templateUser = document.getElementById('template-user').content
const fragment = document.createDocumentFragment()
const btnSave = document.getElementById('btnSave')
let idUpdate = null 

// Eventos de mi página
document.addEventListener('DOMContentLoaded', () => {
    loadData()
})

btnSave.addEventListener('click', (e) => {
    e.preventDefault()
    sendData()
})

const sendData = () => {
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const address = document.getElementById('address').value
    const email = document.getElementById('email').value
    const number = document.getElementById('number').value

    if(firstname.trim().lenght !== 0 && lastname.trim().lenght !== 0) {
        const obj = {
            firstname,
            lastname,
            address,
            email,
            number
        }

        fetch('http://localhost:9000/create', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then( async(res) => {
            const result = await res.json()
            if (result.msg === 'success') {
                loadData()
            }
            console.log('@@@@ result => ', result)
        }).catch((error) => {
            console.log('@@@@ error => ', error)
        })
    }
}

const loadData = async() => {
    const data = await fetch('http://localhost:9000/')
    const usuarios = await data.json()
    //console.log('@@@ data => ', usuarios)
    if (usuarios.msg === 'success') {
        drawUsers(usuarios.data)
    }
}

const drawUsers = (items) => {
    //console.log('@@@ items => ', items)
    users.innerHTML = ''
    items.forEach((user) => {
        const clone = templateUser.cloneNode(true)
        clone.querySelectorAll('th')[0].textContent = user.firstname
        clone.querySelectorAll('th')[1].textContent = user.lastname
        clone.querySelectorAll('th')[2].textContent = user.address
        clone.querySelectorAll('th')[3].textContent = user.email
        clone.querySelectorAll('th')[4].textContent = user.number
        clone.querySelector('.btn-danger').dataset.id = user.id
        clone.querySelector('.btn-warning').dataset.id = user.id

        // Crear evento para borrar
        const btnDelete = clone.querySelector('.btn-danger')
            btnDelete.addEventListener('click', () => {
            const confirmation = window.confirm("¿Estás seguro de que deseas eliminar este usuario?")
            if (confirmation) {
                deleteUser(btnDelete.dataset.id)
            }
    })
        //Crear evento para actualizar
        const btnUpdate = clone.querySelector('.btn-warning')
        btnUpdate.addEventListener('click', () => {
            idUpdate = btnUpdate.dataset.id
            window.location.replace(`/update-user.html?id=${idUpdate}`)
        })

        fragment.appendChild(clone)
    })
    users.appendChild(fragment)
}

const deleteUser = async (id) => {
    console.log('@@@ id => ', id)
    const res = await fetch(`http://localhost:9000/delete/${id}`)
    const result = await res.json()
    //console.log('@@@ result => ', result)
    if (result.msg === 'user deleted') {
        loadData()
    }
}