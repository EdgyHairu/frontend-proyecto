const btnUpdate = document.getElementById('btnUpdate')
const btnReturn = document.getElementById('btnReturn')
let idUpdate
let id
document.addEventListener('DOMContentLoaded', () => {
    idUpdate = location.search.substring(1).split("&")
    id = idUpdate[0].substring(3, idUpdate[0].length)
    getUser(id)
    console.log('@@@ idUpdate => ', idUpdate)
})

btnUpdate.addEventListener('click', (e) => {
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const address = document.getElementById('address').value
    const email = document.getElementById('email').value
    const number = document.getElementById('number').value

    if(firstname.trim().length !== 0 && lastname.trim().length !== 0) {
        const obj = {
            id,
            firstname,
            lastname,
            address,
            email,
            number
        }

        fetch('http://localhost:9000/update', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then( async(res) => {
            const result = await res.json()
            if (result.msg === 'success') {
                window.location.replace('/')
            }
        }).catch((error) => {
            console.log('@@@@ error => ', error)
        })
    }
    e.preventDefault()
})

btnReturn.addEventListener('click', (e) => {
    window.location.replace('/')
    e.preventDefault()
})

const getUser = async (id) => {
    const user = await fetch(`http://localhost:9000/get-update/${id}`)
    const result = await user.json()
    if (result.msg === 'success') {
        loadDataUser(result.data)
    } else {
        alert('User not Found')
    }
    
    console.log('@@@ result => ', result)
}

const loadDataUser = (user) => {
    const id = document.getElementById('id')
    const firstname = document.getElementById('firstname')
    const lastname = document.getElementById('lastname')
    const address = document.getElementById('address')
    const email = document.getElementById('email')
    const number = document.getElementById('number')

    id.value = id
    firstname.value = user.firstname
    lastname.value = user.lastname
    address.value = user.address
    email.value = user.email
    number.value = user.number
}