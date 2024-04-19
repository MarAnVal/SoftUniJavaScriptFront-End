window.addEventListener("load", solve);

function solve() {
    let inputDomElement = {
        studentNameElement: document.getElementById('student'),
        universityElement: document.getElementById('university'),
        scoreElement: document.getElementById('score'),
    }

    let listsDomElements = {
        previewList: document.getElementById('preview-list'),
        applicationList: document.getElementById('candidates-list'),
    }

    let addButtonElement = document.getElementById('next-btn');
    addButtonElement.addEventListener('click', addItem);

    function getLiElement(item) {
        let liElement = document.createElement('li');
        liElement.classList.add('application');

        let articleElement = document.createElement('article');

        let studentNameElement = document.createElement('h4');
        studentNameElement.textContent = item.studentName;
        articleElement.appendChild(studentNameElement);

        let universityElement = document.createElement('p');
        universityElement.textContent = `University: ${item.university}`;
        articleElement.appendChild(universityElement)

        let scoreElement = document.createElement('p');
        scoreElement.textContent = `Score: ${item.score}`;
        articleElement.appendChild(scoreElement);

        liElement.appendChild(articleElement);

        let editButtonElement = document.createElement('button');
        editButtonElement.classList.add('action-btn', 'edit');
        editButtonElement.textContent = 'edit';
        liElement.appendChild(editButtonElement);
        editButtonElement.addEventListener('click', (e) => editItem(e, item));

        let applyButtonElement = document.createElement('button');
        applyButtonElement.classList.add('action-btn', 'apply');
        applyButtonElement.textContent = 'apply';
        liElement.appendChild(applyButtonElement);
        applyButtonElement.addEventListener('click', applyItem);

        return liElement;
    }

    function addItem() {
        let item = getInputData();
        if (item) {
            let liElement = getLiElement(item);
            listsDomElements.previewList.appendChild(liElement);

            addButtonElement.setAttribute('disabled', 'disabled');
            cleanInputFields();
        }
    }

    function applyItem(e) {
        let liElement = e.currentTarget.parentElement
        liElement.querySelector('button:last-child').remove();
        liElement.querySelector('button:last-child').remove();

        listsDomElements.applicationList.appendChild(liElement);

        addButtonElement.removeAttribute('disabled');
    }

    function editItem(e, item) {
        inputDomElement.studentNameElement.value = item.studentName;
        inputDomElement.universityElement.value = item.university;
        inputDomElement.scoreElement.value = item.score;

        e.target.parentElement.remove();

        addButtonElement.removeAttribute('disabled');
    }

    function cleanInputFields() {
        for (let selector in inputDomElement) {
            inputDomElement[selector].value = '';
        }
    }

    function getInputData() {
        let studentName = inputDomElement.studentNameElement.value;
        let university = inputDomElement.universityElement.value;
        let score = inputDomElement.scoreElement.value;

        if (studentName && university && score) {
            return {studentName, university, score};
        }
    }
}
  