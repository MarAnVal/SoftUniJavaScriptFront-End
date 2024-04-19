let baseUrl = 'http://localhost:3030/jsonstore/tasks';

let inputDomSelectors = {
    locationInputElement: document.getElementById('location'),
    temperatureInputElement: document.getElementById('temperature'),
    dateInputElement: document.getElementById('date'),
};

let buttonDomSelectors = {
    loadHistoryButton: document.getElementById('load-history'),
    editButton: document.getElementById('edit-weather'),
    addButton: document.getElementById('add-weather'),
};

buttonDomSelectors.loadHistoryButton.addEventListener('click', load);
buttonDomSelectors.addButton.addEventListener('click', addItem);
buttonDomSelectors.editButton.addEventListener('click', editItem);

let divFormElement = document.querySelector('div#list div.container:first-child');
divFormElement.style.display = 'none'; //default flex

let listElement = document.getElementById('list');

function load() {
    listElement.innerHTML = '';
    cleanInputFields();

    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            for (let itemId in data) {
                attachElement(getListElement(data[itemId]));
            }
        });
}

function getListElement(item) {
    let newDivElement = divFormElement.cloneNode(true);
    newDivElement.style.display = 'flex';

    let locationElement = newDivElement.querySelector('h2');
    locationElement.textContent = item.location;

    let temperatureElement = newDivElement.querySelector('h3:nth-child(2)');
    temperatureElement.textContent = item.temperature;

    let dateElement = newDivElement.querySelector('h3:nth-child(3)');
    dateElement.textContent = item.date;

    let changeButton = newDivElement.querySelector('button.change-btn');
    changeButton.addEventListener('click', (e) => changeItem(e, item));

    let deleteButton = newDivElement.querySelector('button.delete-btn');
    deleteButton.addEventListener('click', (e) => deleteItem(e, item));

    return newDivElement;
}

function changeItem(e, item) {
    buttonDomSelectors.addButton.setAttribute('disabled', 'disabled');
    buttonDomSelectors.editButton.removeAttribute('disabled');

    inputDomSelectors.locationInputElement.value = item.location;
    inputDomSelectors.temperatureInputElement.value = item.temperature;
    inputDomSelectors.dateInputElement.value = item.date;

    listElement.setAttribute('edit', item._id);

    let element = e.currentTarget.parentElement.parentElement
    element.remove();
}

function editItem() {
    let item = getInputItem();

    if (item) {
        item['_id'] = listElement.getAttribute('edit');

        let url = baseUrl + `/${item['_id']}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then(response => {
                cleanInputFields();
                load();
                buttonDomSelectors.editButton.setAttribute('disabled', 'disabled');
                buttonDomSelectors.addButton.removeAttribute('disabled');
                listElement.removeAttribute('edit');
            })
    }
}

function getInputItem() {
    let location = inputDomSelectors.locationInputElement.value;
    let temperature = inputDomSelectors.temperatureInputElement.value;
    let date = inputDomSelectors.dateInputElement.value;
    if (location && temperature && date) {
        return {location, temperature, date}
    }
}

function addItem() {
    let item = getInputItem();

    if (item) {
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then(response => {
                cleanInputFields();
                load();
            })
    }
}

function deleteItem(e, item) {
    let url = baseUrl + `/${item._id}`;

    fetch(url, {
        method: 'DELETE'
    })
        .then(response => load());
}

function attachElement(element) {
    listElement.appendChild(element);
}

function cleanInputFields() {
    for (let selector in inputDomSelectors) {
        inputDomSelectors[selector].value = ''
    }
}