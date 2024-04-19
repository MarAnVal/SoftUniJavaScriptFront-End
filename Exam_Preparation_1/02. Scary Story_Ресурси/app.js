window.addEventListener("load", solve);

function solve() {
    let inputDomSelectors = {
        firstNameElement: document.getElementById(`first-name`),
        lastNameElement: document.getElementById(`last-name`),
        ageElement: document.getElementById(`age`),
        storyTitleElement: document.getElementById(`story-title`),
        genreElement: document.getElementById(`genre`),
        storyElement: document.getElementById(`story`),
    }

    let previewListElement = document.getElementById('preview-list');

    let publishButtonElement = document.getElementById('form-btn');
    publishButtonElement.addEventListener('click', publishItem);

    function publishItem() {
        let item = getInput();
        if (item) {
            let newLiElement = getNewLiElement(item);
            console.log(newLiElement)
            previewListElement.appendChild(newLiElement);
            clearInput();
            publishButtonElement.setAttribute('disabled', 'disabled');
        }
    }

    function getNewLiElement(item) {
        let liElement = document.createElement('li');
        liElement.classList.add('story-info');

        let articleElement = document.createElement('article');

        let nameElement = document.createElement('h4');
        nameElement.textContent = `Name: ${item.firstName} ${item.lastName}`;
        articleElement.appendChild(nameElement);

        let ageElement = document.createElement('p');
        ageElement.textContent = `Age: ${item.age}`;
        articleElement.appendChild(ageElement);

        let titleElement = document.createElement('p');
        titleElement.textContent = `Title: ${item.storyTitle}`;
        articleElement.appendChild(titleElement);

        let genreElement = document.createElement('p');
        genreElement.textContent = `Genre: ${item.genre}`;
        articleElement.appendChild(genreElement);

        let storyElement = document.createElement('p');
        storyElement.textContent = `${item.story}`;
        articleElement.appendChild(storyElement);

        liElement.appendChild(articleElement);

        let saveButtonElement = document.createElement('button');
        saveButtonElement.classList.add('save-btn');
        saveButtonElement.textContent = 'Save Story'
        liElement.appendChild(saveButtonElement);
        saveButtonElement.addEventListener('click', saveItem)

        let editButtonElement = document.createElement('button');
        editButtonElement.classList.add('edit-btn');
        editButtonElement.textContent = 'Edit Story'
        liElement.appendChild(editButtonElement);
        editButtonElement.addEventListener('click', (e) => changeItem(e, item));

        let deleteButtonElement = document.createElement('button');
        deleteButtonElement.classList.add('delete-btn');
        deleteButtonElement.textContent = 'Delete Story'
        liElement.appendChild(deleteButtonElement);
        deleteButtonElement.addEventListener('click', deleteItem);

        return liElement;
    }

    function changeItem(e, item) {
        inputDomSelectors.firstNameElement.value = item.firstName;
        inputDomSelectors.lastNameElement.value = item.lastName;
        inputDomSelectors.ageElement.value = item.age;
        inputDomSelectors.storyTitleElement.value = item.storyTitle;
        inputDomSelectors.genreElement.value = item.genre;
        inputDomSelectors.storyElement.value = item.story;

        publishButtonElement.removeAttribute('disabled');

        e.target.parentElement.remove();
    }

    function deleteItem(e) {
        e.currentTarget.parentElement.remove();
        publishButtonElement.removeAttribute('disabled');
    }

    function saveItem() {
        let mainElement = document.getElementById('main');
        mainElement.innerHTML = '';

        let h1Element = document.createElement('h1');
        h1Element.textContent = 'Your scary story is saved!';
        mainElement.appendChild(h1Element);
    }

    function getInput() {
        let firstName = inputDomSelectors.firstNameElement.value;
        let lastName = inputDomSelectors.lastNameElement.value;
        let age = inputDomSelectors.ageElement.value;
        let storyTitle = inputDomSelectors.storyTitleElement.value;
        let genre = inputDomSelectors.genreElement.value;
        let story = inputDomSelectors.storyElement.value;

        if (firstName && lastName && age && storyTitle && genre && story) {
            return {firstName, lastName, age, storyTitle, genre, story}
        }
    }

    function clearInput() {
        for (let selector in inputDomSelectors) {
            inputDomSelectors[selector].value = '';
        }
    }
}
