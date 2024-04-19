let baseUrl = 'http://localhost:3030/jsonstore/tasks';

let eventDomElements = {
    loadBoardElement: document.getElementById('load-board-btn'),
    createTaskElement: document.getElementById('create-task-btn'),
}

let listsDomSelectors = {
    todoListElement: document.querySelector('#todo-section ul.task-list'),
    inProcessListElement: document.querySelector('#in-progress-section ul.task-list'),
    codeReviewListElement: document.querySelector('#code-review-section ul.task-list'),
    doneListElement: document.querySelector('#done-section ul.task-list'),
}

let inputDomElements = {
    titleInputElement: document.getElementById('title'),
    descriptionInputElement: document.getElementById('description'),
}

let tasks = {};

eventDomElements.loadBoardElement.addEventListener('click', getRequest);
eventDomElements.createTaskElement.addEventListener('click', postRequest);

function getNewTaskElement(task) {
    let liElement = document.createElement('li');
    liElement.setAttribute('id', task._id);

    let h3Element = document.createElement('h3');
    h3Element.textContent = task.title;
    liElement.appendChild(h3Element);

    let pElement = document.createElement('p');
    pElement.textContent = task.description;
    liElement.appendChild(pElement);

    let buttonElement = document.createElement('button');
    switch (task.status) {
        case 'ToDo':
            buttonElement.textContent = 'Move to In Progress';
            break;
        case 'In Progress':
            buttonElement.textContent = 'Move to Code Review'
            break;
        case 'Code Review':
            buttonElement.textContent = 'Move to Done'
            break;
        case 'Done':
            buttonElement.textContent = 'Close'
            break;
    }
    buttonElement.addEventListener('click', moveElement);

    liElement.appendChild(buttonElement);

    return liElement;
}

function clearFields(){
    for (let element in listsDomSelectors) {
        listsDomSelectors[element].innerHTML = '';
    }
    for (let element in inputDomElements) {
        inputDomElements[element].value = '';
    }
}

function moveElement(e) {
    let elementId = e.target.parentElement.id;
    let task = tasks[elementId];
    switch (task.status) {
        case 'ToDo':
            task.status = 'In Progress';
            putRequest(task);
            console.log('done');
            break;
        case 'In Progress':
            task.status = 'Code Review';
            putRequest(task);
            break;
        case 'Code Review':
            task.status = 'Done';
            putRequest(task);
            break;
        case 'Done':
            deleteRequest(elementId);
            break;
    }
}

function attachElement(element) {
    let buttonElement = element.querySelector('button:last-child');
    switch (buttonElement.textContent) {
        case 'Move to In Progress':
            listsDomSelectors.todoListElement.appendChild(element);
            break;
        case 'Move to Code Review':
            listsDomSelectors.inProcessListElement.appendChild(element);
            break;
        case 'Move to Done':
            listsDomSelectors.codeReviewListElement.appendChild(element);
            break;
        case 'Close':
            listsDomSelectors.doneListElement.appendChild(element);
            break;
    }
}

function getRequest() {
    clearFields();

    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            for (const taskId in data) {
                attachElement(getNewTaskElement(data[taskId]));
                tasks[data[taskId]._id] = data[taskId];
            }
        });
}

function putRequest(element) {
    let url = baseUrl + `/${element._id}`;
    fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(element),
        }
    ).then(respose =>eventDomElements.loadBoardElement.click());

}

function deleteRequest(elementID) {
    let url = baseUrl + `/${elementID}`;
    fetch(url, {
        method: 'DELETE',
    }).then(respose =>eventDomElements.loadBoardElement.click());
}

function postRequest() {
    let title = inputDomElements.titleInputElement.value;
    let description = inputDomElements.descriptionInputElement.value;
    if (title && description) {
        let status = 'ToDo';
        let element = {
            title,
            description,
            status,
        };

        fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(element),
            }
        ).then(respose =>eventDomElements.loadBoardElement.click());
    }
}

function attachEvents() {
}

attachEvents();