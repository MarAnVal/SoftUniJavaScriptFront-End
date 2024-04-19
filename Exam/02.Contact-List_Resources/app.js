window.addEventListener("load", solve);

function solve() {
    let inputDomSelectors = {
        nameInputElement: document.getElementById('name'),
        phoneInputElement: document.getElementById('phone'),
        categoryInputElement: document.getElementById('category'),
    }

    let addNumberElement = document.getElementById('add-btn');
    addNumberElement.addEventListener('click', addNumber);

    let checkListElement = document.getElementById('check-list');
    let contactListElement = document.getElementById('contact-list');

    function addNumber() {
        let data = getInput();
        if (data) {
            let newLiElement = getNewLiElement(data);
            checkListElement.appendChild(newLiElement);

            clearInputFields();
        }
    }

    function getNewLiElement(data) {
        let liElement = document.createElement('li');

        let articleElement = document.createElement('article');

        let nameElement = document.createElement('p');
        nameElement.textContent = `name:${data.name}`;
        articleElement.appendChild(nameElement);

        let phoneElement = document.createElement('p');
        phoneElement.textContent = `phone:${data.phone}`;
        articleElement.appendChild(phoneElement);

        let categoryElement = document.createElement('p');
        categoryElement.textContent = `category:${data.category}`;
        articleElement.appendChild(categoryElement);

        liElement.appendChild(articleElement);

        let buttonDivElement = document.createElement('div');
        buttonDivElement.classList.add('buttons');

        let editButtonElement = document.createElement('button');
        editButtonElement.classList.add('edit-btn');
        buttonDivElement.appendChild(editButtonElement);
        editButtonElement.addEventListener('click', (e) => editNumber(e, data));

        let saveButtonElement = document.createElement('button');
        saveButtonElement.classList.add('save-btn');
        buttonDivElement.appendChild(saveButtonElement);
        saveButtonElement.addEventListener('click', (e) => saveNumber(e, data))

        liElement.appendChild(buttonDivElement);

        return liElement;
    }

    function editNumber(e, data) {
        e.currentTarget.parentNode.parentNode.remove();

        inputDomSelectors.nameInputElement.value = data.name;
        inputDomSelectors.phoneInputElement.value = data.phone;
        inputDomSelectors.categoryInputElement.value = data.category;
    }

    function saveNumber(e) {
        let liElement = e.currentTarget.parentNode.parentNode;
        e.currentTarget.parentNode.remove();

        let deleteButtonElement = document.createElement('button');
        deleteButtonElement.classList.add('del-btn');
        deleteButtonElement.addEventListener('click', deleteNumber);

        liElement.appendChild(deleteButtonElement);

        contactListElement.appendChild(liElement);
    }

    function deleteNumber(e) {
        e.currentTarget.parentNode.remove();
    }

    function getInput() {
        let name = inputDomSelectors.nameInputElement.value;
        let phone = inputDomSelectors.phoneInputElement.value;
        let category = inputDomSelectors.categoryInputElement.value;
        if (name && phone && category) {
            return {name, phone, category}
        }
    }

    function clearInputFields() {
        for (let selector in inputDomSelectors) {
            inputDomSelectors[selector].value = '';
        }
    }
}
  