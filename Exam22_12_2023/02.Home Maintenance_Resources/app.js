window.addEventListener("load", solve);

function solve() {
    let items = {};
    let counter = 0;
    let editedItemId = undefined;

    let inputDomeElement = {
        placeInputElement: document.getElementById('place'),
        actionInputElement: document.getElementById('action'),
        personInputElement: document.getElementById('person'),
    }

    let listSelectors = {
        taskList: document.getElementById('task-list'),
        doneList: document.getElementById('done-list'),
    }

    let addButtonElement = document.getElementById('add-btn');
    addButtonElement.addEventListener('click', postItem);


    function postItem() {

        let place = inputDomeElement.placeInputElement.value;
        let action = inputDomeElement.actionInputElement.value;
        let person = inputDomeElement.personInputElement.value;
        if (place && action && person) {
            let id;
            if(editedItemId){
               id = editedItemId;
            } else {
                id = generateId();
            }
            let status = 'task'
            items[id] = {place, action, person, id, status};

            loadItems();
            clearInputFields();
            editedItemId = undefined;
        }
    }

    function loadItems() {
        clearLists();

        for (let itemsId in items) {
            if (items[itemsId].status === 'task') {
                let element = getTaskElement(items[itemsId]);
                listSelectors.taskList.appendChild(element);
            } else if (items[itemsId].status === 'done') {
                let element = getDoneElement(items[itemsId]);
                listSelectors.doneList.appendChild(element);
            }
        }
    }

    function getTaskElement(item) {
        let liElement = document.createElement('li');
        liElement.setAttribute('id', item.id);
        liElement.classList.add('clean-task');

        let articleElement = getMainArticle(item);
        liElement.appendChild(articleElement);

        let divElement = document.createElement('div');
        divElement.classList.add('buttons');

        let editButtonElement = document.createElement('button');
        editButtonElement.classList.add('edit');
        editButtonElement.textContent = 'Edit';
        editButtonElement.addEventListener('click', editElement);
        divElement.appendChild(editButtonElement);

        let doneButtonElement = document.createElement('button');
        doneButtonElement.classList.add('done');
        doneButtonElement.textContent = 'Done';
        doneButtonElement.addEventListener('click', doneTask);
        divElement.appendChild(doneButtonElement);

        liElement.appendChild(divElement);

        return liElement;
    }

    function getDoneElement(item) {
        let liElement = document.createElement('li');
        liElement.setAttribute('id', item.id);

        let articleElement = getMainArticle(item);
        liElement.appendChild(articleElement);

        let deleteButtonElement = document.createElement('button');
        deleteButtonElement.classList.add('delete');
        deleteButtonElement.textContent = 'Delete';
        deleteButtonElement.addEventListener('click', deleteElement);
        liElement.appendChild(deleteButtonElement)

        return liElement;
    }

    function getMainArticle(item) {
        console.log(item)
        let articleElement = document.createElement('article');

        let p1Element = document.createElement('p');
        p1Element.textContent = `Place:${item.place}`;
        articleElement.appendChild(p1Element);

        let p2Element = document.createElement('p');
        p2Element.textContent = `Action:${item.action}`;
        articleElement.appendChild(p2Element);

        let p3Element = document.createElement('p');
        p3Element.textContent = `Person:${item.person}`;
        articleElement.appendChild(p3Element);

        return articleElement;
    }

    function doneTask(e) {
        let id = e.target.parentElement.parentElement.id;
        items[id].status = 'done';

        loadItems()
    }

    function editElement(e) {
        let id = e.target.parentElement.parentElement.id;
        let liElement = e.target.parentElement.parentElement;
        liElement.remove();
        let item = items[id];
        editedItemId = id;

        inputDomeElement.placeInputElement.value = item.place;
        inputDomeElement.actionInputElement.value = item.action;
        inputDomeElement.personInputElement.value = item.person;
    }

    function deleteElement(e) {
        let id = e.target.parentElement.id;
        delete items[id];

        console.log(items);

        loadItems();
    }

    function clearInputFields() {
        for (let element in inputDomeElement) {
            inputDomeElement[element].value = ''
        }
    }

    function clearLists() {
        for (let selector in listSelectors) {
            listSelectors[selector].innerHTML = '';
        }
    }

    function generateId() {
        counter++;
        return counter;
    }
}