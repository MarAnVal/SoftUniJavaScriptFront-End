function attachEvents() {
    let baseUrl = 'http://localhost:3030/jsonstore/tasks';

    let titleInputElement = document.getElementById('title');

    let addButtonElement = document.getElementById('add-button');
    addButtonElement.addEventListener('click', createTask);

    let loadButtonElement = document.getElementById('load-button');
    loadButtonElement.addEventListener('click', loadTasks);

    let listElement = document.getElementById('todo-list');

    function loadTasks() {
        titleInputElement.value = '';

        fetch(baseUrl)
            .then(response => response.json())
            .then(data => {
                for (let itemId in data) {
                    listElement.appendChild(getNewLiElement(data[itemId]));
                }
            })
    }

    function getNewLiElement(item) {
        let liElement = document.createElement('li');

        let nameElement = document.createElement('span');
        nameElement.textContent = item.name;
        liElement.appendChild(nameElement);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.addEventListener('click', (e) => deleteTask(e, item));
        liElement.appendChild(deleteButton);

        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', (e) => changeTask(e, item));
        liElement.appendChild(editButton);

        return liElement
    }

    function createTask() {
        let name = titleInputElement.value;
        if (name) {
            fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({name}),
            })
                .then(response => {
                    loadTasks();
                })
        }
    }

    function changeTask(e, item) {
        let liElement = e.currentTarget.parentNode;
        liElement.innerHTML = '';

        let nameElement = document.createElement('input');
        nameElement.value = item.name;
        nameElement.setAttribute('id', 'change');
        nameElement.setAttribute('to-edit', item['_id'])
        nameElement.setAttribute('type', 'text');
        liElement.appendChild(nameElement);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.addEventListener('click', (e) => deleteTask(e, item));
        liElement.appendChild(deleteButton);

        let editButton = document.createElement('button');
        editButton.textContent = 'Submit';
        editButton.addEventListener('click', editTask);
        liElement.appendChild(editButton);
    }

    function editTask(e) {
        let id = e.currentTarget.parentNode.getElementById('change').getAttribute('to-edit');
        let changedName = e.currentTarget.parentNode.getElementById('change').value;
        let url = `${baseUrl}/${id}`;

        if (changedName) {

            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({name, '_id': id}),
            }).then(response => {
                loadTasks();
            })
        }
    }

    function deleteTask(e, item) {
        let url = `${baseUrl}/${item['_id']}}`

        fetch(url, {
            method: 'DELETE'
        })
            .then(response => {
                loadTasks();
            })
    }
}

attachEvents();
