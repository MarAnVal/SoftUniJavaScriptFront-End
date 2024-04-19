let baseUrl = 'http://localhost:3030/jsonstore/tasks';

let inputDomElements = {
    courseNameInputElement: document.getElementById('course-name'),
    typeInputElement: document.getElementById('course-type'),
    descriptionInputElement: document.getElementById('description'),
    teacherInputElement: document.getElementById('teacher-name'),
}

let loadCoursesButtonElement = document.getElementById('load-course');
loadCoursesButtonElement.addEventListener('click', loadCourses);

let addButtonElement = document.getElementById('add-course');
addButtonElement.addEventListener('click', addCourse);

let editButtonElement = document.getElementById('edit-course');
editButtonElement.addEventListener('click', editCourse);

let listElement = document.getElementById('list');

function loadCourses() {

    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            for (const course in data) {

                listElement.innerHTML = '';
                cleanInputFields();
                for (let course in data) {
                    listElement.appendChild(getNewTaskElement(data[course]));
                }
            }
        })
}

function getNewTaskElement(course) {
    let divElement = document.createElement('div');
    divElement.classList.add('container');

    let h2Element = document.createElement('h2');
    h2Element.textContent = course.title;
    divElement.appendChild(h2Element);

    let h31Element = document.createElement('h3');
    h31Element.textContent = course.teacher;
    divElement.appendChild(h31Element);

    let h32Element = document.createElement('h3');
    h32Element.textContent = course.type;
    divElement.appendChild(h32Element);

    let h4Element = document.createElement('h4');
    h4Element.textContent = course.description;
    divElement.appendChild(h4Element);

    let changeButtonElement = document.createElement('button');
    changeButtonElement.classList.add('edit-btn');
    changeButtonElement.textContent = "Edit Course";
    changeButtonElement.addEventListener('click', (e) => changeCourse(e, course))
    divElement.appendChild(changeButtonElement);

    let finishButtonElement = document.createElement('button');
    finishButtonElement.classList.add('finish-btn');
    finishButtonElement.textContent = "Finish Course";
    finishButtonElement.addEventListener('click', (e) => deleteCourse(e, course))
    divElement.appendChild(finishButtonElement);

    return divElement;
}

function cleanInputFields() {
    for (let element in inputDomElements) {
        inputDomElements[element].value = '';
    }
}

function getInput() {
    let title = inputDomElements.courseNameInputElement.value;
    let type = inputDomElements.typeInputElement.value;
    let description = inputDomElements.descriptionInputElement.value;
    let teacher = inputDomElements.teacherInputElement.value;

    if (title && type && description && teacher) {
        return {title, type, description, teacher}
    }
}

function editCourse(e) {
    let item = getInput();

    if(item) {
        let id = e.target.getAttribute('to-edit');
        let url = baseUrl + `/${id}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then(response => {
                e.target.removeAttribute('to-edit');

                addButtonElement.removeAttribute('disabled');
                editButtonElement.setAttribute('disabled', 'disabled');

                loadCourses();
            })
    }
}

function addCourse() {
    let item = getInput();

    if (item) {
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then(response => loadCourses());
    }
}

function deleteCourse(e, item) {
    let url = baseUrl + `/${item._id}`
    fetch(url, {
        method: 'DELETE'

    }).then(response => loadCourses());
}

function changeCourse(e, item) {
    editButtonElement.setAttribute('to-edit', item['_id']);

    inputDomElements.courseNameInputElement.value = item.title;
    inputDomElements.typeInputElement.value = item.type;
    inputDomElements.descriptionInputElement.value = item.description;
    inputDomElements.teacherInputElement.value = item.teacher;

    editButtonElement.removeAttribute('disabled');
    addButtonElement.setAttribute('disabled', 'disabled');

    e.target.parentElement.remove();
}