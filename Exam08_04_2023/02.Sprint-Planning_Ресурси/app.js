window.addEventListener('load', solve);

function solve() {
    let pointsCounter = 0;
    let idCounter = 1;

    let inputDomSelectors = {
        titleInputElement: document.getElementById('title'),
        descriptionInputElement: document.getElementById('description'),
        labelInputElement: document.getElementById('label'),
        pointsInputElement: document.getElementById('points'),
        assigneeInputElement: document.getElementById('assignee'),
        hiddenInputElement: document.getElementById('task-id'),
    }

    let addButtonElement = document.getElementById('create-task-btn');
    addButtonElement.addEventListener('click', createItem);

    let deleteButtonElement = document.getElementById('delete-task-btn');
    deleteButtonElement.addEventListener('click', deleteItem);

    let listElement = document.getElementById('tasks-section');

    let totalPointsElement = document.getElementById('total-sprint-points');

    function createItem() {
        let item = getInput();

        if (item) {
            let newElement = getLiElement(item);

            listElement.appendChild(newElement);

            clearInputFields();

            updateTotalPointsElement();
        }
    }

    function updateTotalPointsElement() {
        totalPointsElement.textContent = `Total Points ${pointsCounter}pts`;
    }

    function getLiElement(item) {
        item.id = `task-${idCounter}`;
        let articleElement = document.createElement('article');
        articleElement.setAttribute('id', item.id);
        idCounter++;
        articleElement.classList.add('task-card');

        let labelElement = document.createElement('div');
        let labelClass, symbol;
        switch (item.label) {
            case 'Feature':
                labelClass = 'feature';
                symbol = '⊡';
                break;
            case 'Low Priority Bug':
                labelClass = 'low-priority';
                symbol = '☉';
                break;
            case 'High Priority Bug':
                labelClass = 'high-priority';
                symbol = '⚠';
                break;
        }
        labelElement.classList.add('task-card-label', labelClass);
        labelElement.textContent = `${item.label} ${symbol}`;
        articleElement.appendChild(labelElement);

        let titleElement = document.createElement('h3');
        titleElement.classList.add('task-card-title');
        titleElement.textContent = item.title;
        articleElement.appendChild(titleElement);

        let descriptionElement = document.createElement('p');
        descriptionElement.classList.add('task-card-description');
        descriptionElement.textContent = item.description;
        articleElement.appendChild(descriptionElement);

        let pointsElement = document.createElement('div');
        pointsElement.classList.add('task-card-points');
        pointsElement.textContent = `Estimated at ${item.points} pts`
        pointsCounter += Number(item.points);
        articleElement.appendChild(pointsElement);

        let assigneeElement = document.createElement('div');
        assigneeElement.classList.add('task-card-assignee');
        assigneeElement.textContent = `Assigned to: ${item.assignee}`;
        articleElement.appendChild(assigneeElement);

        let actionElement = document.createElement('div');
        actionElement.classList.add('task-card-actions');

        let changeButtonElement = document.createElement('button');
        changeButtonElement.textContent = 'Delete';
        changeButtonElement.addEventListener('click', (e) => changeItem(e, item));
        actionElement.appendChild(changeButtonElement);

        articleElement.appendChild(actionElement);

        return articleElement;
    }

    function deleteItem() {
        let id = inputDomSelectors.hiddenInputElement.value;

        document.getElementById(id).remove();

        pointsCounter-= inputDomSelectors.pointsInputElement.value;
        updateTotalPointsElement();

        clearInputFields();
        enableInputFields();

        addButtonElement.removeAttribute('disabled');
        deleteButtonElement.setAttribute('disabled', 'disabled');

    }

    function changeItem(e, item) {
        inputDomSelectors.titleInputElement.value = item.title;
        inputDomSelectors.descriptionInputElement.value = item.description;
        inputDomSelectors.labelInputElement.value = item.label;
        inputDomSelectors.pointsInputElement.value = item.points;
        inputDomSelectors.assigneeInputElement.value = item.assignee;

        deleteButtonElement.removeAttribute('disabled');
        addButtonElement.setAttribute('disabled', 'disabled');

        disableInputFields();

        inputDomSelectors.hiddenInputElement.value = item.id;
    }

    function getInput() {
        let title = inputDomSelectors.titleInputElement.value;
        let description = inputDomSelectors.descriptionInputElement.value;
        let label = inputDomSelectors.labelInputElement.value;
        let points = inputDomSelectors.pointsInputElement.value;
        let assignee = inputDomSelectors.assigneeInputElement.value;

        if (title && description && label && points && assignee) {
            return {title, description, label, points, assignee}
        }
    }

    function clearInputFields() {
        for (let selector in inputDomSelectors) {
            inputDomSelectors[selector].value = '';
        }
    }

    function disableInputFields() {
        for (let selector in inputDomSelectors) {
            inputDomSelectors[selector].setAttribute('disabled', 'disabled');
        }
    }

    function enableInputFields() {
        for (let selector in inputDomSelectors) {
            inputDomSelectors[selector].removeAttribute('disabled');
        }
    }
}