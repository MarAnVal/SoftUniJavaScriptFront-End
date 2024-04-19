let baseUrl = 'http://localhost:3030/jsonstore/tasks';

let inputDomElements = {
    nameInputElement: document.getElementById('name'),
    daysInputElement: document.getElementById('num-days'),
    dateInputElement: document.getElementById('from-date'),
}

let loadButtonElement = document.getElementById('load-vacations');
loadButtonElement.addEventListener('click', loadVacations);

let addButtonElement = document.getElementById('add-vacation');
addButtonElement.addEventListener('click', addVacation);

let editButtonElement = document.getElementById('edit-vacation');
editButtonElement.addEventListener('click', editVacation);

let listElement = document.getElementById('list');

let printForm = document.querySelector('div#list div:first-child');
let listElementForm = printForm.cloneNode(true);
printForm.remove();

function loadVacations() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            listElement.innerHTML = '';
            clearInputFields();
            for (let itemId in data) {
                listElement.appendChild(getNewListElement(data[itemId]));
            }
        })
}

function getNewListElement(item) {
    let newDivElement = listElementForm.cloneNode(true);

    let nameElement = newDivElement.querySelector('h2:first-child');
    nameElement.textContent = item.name;

    let daysElement = newDivElement.querySelector(':nth-child(3)');
    daysElement.textContent = item.days;

    let dateElement = newDivElement.querySelector(':nth-child(2)');
    dateElement.textContent = item.date;

    let changeButton = newDivElement.querySelector('button.change-btn');
    changeButton.addEventListener('click', (e) => changeVacation(e, item));

    let doneButton = newDivElement.querySelector('button.done-btn');
    doneButton.addEventListener('click', (e) => doneVacation(e, item));

    return newDivElement;
}

function addVacation() {
    let item = getInput();
    console.log('in add')
    if (item) {
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then(response => {
                if (response.ok) {
                    loadVacations();
                }
            });
    }
}

function editVacation(e) {
    let item = getInput();

    if (item) {
        let id = e.currentTarget.getAttribute('toEdit');
        item['_id'] = id;
        let url = baseUrl + `/${id}`;
        e.currentTarget.removeAttribute("toEdit");

        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then(response => {
                if (response.ok) {
                    editButtonElement.setAttribute('disabled', 'disabled');
                    addButtonElement.removeAttribute('disabled');
                    loadVacations();
                }
            });
    }
}

function changeVacation(e, item) {
    let id = item['_id'];

    editButtonElement.setAttribute("toEdit", id);

    e.currentTarget.parentElement.remove();

    inputDomElements.nameInputElement.value = item.name;
    inputDomElements.daysInputElement.value = item.days;
    inputDomElements.dateInputElement.value = item.date;

    addButtonElement.setAttribute('disabled', 'disabled');
    editButtonElement.removeAttribute('disabled');
}

function doneVacation(e, item) {
    let id = item['_id'];
    let url = baseUrl + `/${id}`;

    fetch(url, {
        method: 'DELETE'
    }).then(response => {
        loadVacations();
    })
}

function clearInputFields() {
    for (let selector in inputDomElements) {
        inputDomElements[selector].value = '';
    }
}

function getInput() {
    let name = inputDomElements.nameInputElement.value;
    let days = inputDomElements.daysInputElement.value;
    let date = inputDomElements.dateInputElement.value;

    if (name && days && date) {
        return {name, days, date}
    }
}