let baseUrl = 'http://localhost:3030/jsonstore/games';

let inputSelectors = {
    nameInputElement: document.getElementById('g-name'),
    typeInputElement: document.getElementById('type'),
    playersInputElement: document.getElementById('players'),
}

let listElement = document.getElementById('games-list');

let liFormElement = document.querySelector('#games-list .board-game');

listElement.innerHTML = '';

let loadButtonElement = document.getElementById('load-games');
loadButtonElement.addEventListener('click', load);

let addButtonElement = document.getElementById('add-game');
addButtonElement.addEventListener('click', addGame);

let editButtonElement = document.getElementById('edit-game');
editButtonElement.addEventListener('click', editGame);

function load() {
    listElement.innerHTML = '';
    clearInput();

    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            for (let itemId in data) {
                listElement.appendChild(getListElement(data[itemId]));
            }
        })
}

function getListElement(item) {
    let newLiElement = liFormElement.cloneNode(true);
    let dataElement = newLiElement.querySelector('.content');
    dataElement.innerHTML = '';

    let nameElement = document.createElement('p');
    nameElement.textContent = item.name;
    dataElement.appendChild(nameElement);

    let typeElement = document.createElement('p');
    typeElement.textContent = item.type;
    dataElement.appendChild(typeElement);

    let playersElement = document.createElement('p');
    playersElement.textContent = item.players;
    dataElement.appendChild(playersElement);

    newLiElement.querySelector('.change-btn').addEventListener('click', (e) => changeGame(e, item));
    newLiElement.querySelector('.delete-btn').addEventListener('click', (e) => deleteGame(e, item));

    return newLiElement;
}

function addGame() {
    let item = getInput();

    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(item),
    })
        .then(response => {
            if (response.ok) {
                load();
            }
        })
}

function changeGame(e, item) {
    inputSelectors.nameInputElement.value = item.name;
    inputSelectors.typeInputElement.value = item.type;
    inputSelectors.playersInputElement.value = item.players;

    e.currentTarget.parentNode.parentNode.remove();
    addButtonElement.setAttribute('disabled', 'disabled');
    editButtonElement.removeAttribute('disabled');
    editButtonElement.setAttribute('edit', item['_id']);
}

function editGame(e) {
    let _id = editButtonElement.getAttribute('edit');
    let url = `${baseUrl}/${_id}`;
    let item = getInput();

    if (item) {
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then(response => {
                if(response.ok){
                    editButtonElement.removeAttribute('edit');
                    addButtonElement.removeAttribute('disabled');
                    editButtonElement.setAttribute('disabled', 'disabled');
                    load();
                }
            })
    }
}

function deleteGame(e, item) {
    let id = item._id;
    let url = `${baseUrl}/${id}`;

    fetch(url, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                load();
            }
        })
}

function getInput() {
    let name = inputSelectors.nameInputElement.value;
    let type = inputSelectors.typeInputElement.value;
    let players = inputSelectors.playersInputElement.value;

    if (name && type && players) {
        return {name, type, players}
    }
}

function clearInput() {
    for (let selector in inputSelectors) {
        inputSelectors[selector].value = '';
    }
}


