let baseUrl = 'http://localhost:3030/jsonstore/gifts';

let inputDomElements = {
    giftInputElement: document.getElementById('gift'),
    forInputElement: document.getElementById('for'),
    priceInputElement: document.getElementById('price'),
}


let listElement = document.getElementById('gift-list');

let divListForm = document.querySelector('#gift-list div.gift-sock');
divListForm.style.display = 'none';

let buttonElements = {
    loadPresentButton: document.getElementById('load-presents'),
    addButtonElement: document.getElementById('add-present'),
    editButtonElement: document.getElementById('edit-present'),
}


buttonElements.loadPresentButton.addEventListener('click', loadItems);

buttonElements.addButtonElement.addEventListener('click', createItem);

function loadItems() {
    listElement.innerHTML = '';

    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            for (let giftId in data) {
                attachElement(getListElement(data[giftId]));
            }
        })
}

function attachElement(domElement) {
    listElement.appendChild(domElement);
}

function getListElement(gift) {
    let divElement = divListForm.cloneNode(true);
    divElement.style.display = 'flex';

    divElement.querySelector('div.content p:nth-child(1)').textContent = gift['gift'];
    divElement.querySelector('div.content p:nth-child(2)').textContent = gift['for'];
    divElement.querySelector('div.content p:nth-child(3)').textContent = gift['price'];

    let editButtonElement = divElement.querySelector('.change-btn');
    editButtonElement.addEventListener('click', (e) => changeItem(e, gift));

    let deleteButtonElement = divElement.querySelector('.delete-btn');
    deleteButtonElement.addEventListener('click', (e) => deleteItem(e, gift));

    return divElement;
}

function createItem() {
    let gift = inputDomElements.giftInputElement.value;
    let forInput = inputDomElements.forInputElement.value;
    let price = inputDomElements.priceInputElement.value;
    if (gift && forInput && price) {
        let inputItem = {
            gift,
            'for': forInput,
            price,
        }

        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(inputItem),
        })
            .then(response => loadItems())

        clearInputFields();
    }
}

function editItem(e, item) {
    let gift = inputDomElements.giftInputElement.value;
    let forInput = inputDomElements.forInputElement.value;
    let price = inputDomElements.priceInputElement.value;
    let id = item._id;
    if (gift && forInput && price) {
        let inputItem = {
            gift,
            'for': forInput,
            price,
            '_id': id,
        }
        let url = baseUrl + `/${id}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(inputItem),
        })
            .then(response => {
                if (response.ok) {
                    let addButtonElement = document.getElementById('add-present');
                    addButtonElement.removeAttribute('disabled');
                    let editButtonElement = document.getElementById('edit-present');
                    editButtonElement.setAttribute('disabled', 'disabled');
                    return loadItems();
                }
            })
    }
}

function changeItem(e, item) {
    inputDomElements.giftInputElement.value = item.gift;
    inputDomElements.forInputElement.value = item['for'];
    inputDomElements.priceInputElement.value = item.price;

    let addButtonElement = document.getElementById('add-present');
    addButtonElement.setAttribute('disabled', 'disabled');
    let editButtonElement = document.getElementById('edit-present');
    editButtonElement.removeAttribute('disabled');

    buttonElements.editButtonElement.addEventListener('click', (e) => editItem(e, item));

    e.target.parentElement.parentElement.remove();
}

function deleteItem(e, item) {
    let id = item._id;
    let url = baseUrl + `/${id}`

    fetch(url, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                loadItems();
            }
        });
}

function clearInputFields() {
    for (let selector in inputDomElements) {
        inputDomElements[selector].value = '';
    }
}