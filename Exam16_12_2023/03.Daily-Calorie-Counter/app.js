let mealElement = document.querySelector('.meal');
mealElement.style.display = 'none';
let editedElementId = null;

let foodInputElement = document.getElementById('food');
let caloriesInputElement = document.getElementById('calories');
let timeInputElement = document.getElementById('time');

let addButtonElement = document.getElementById('add-meal');
addButtonElement.addEventListener('click', pushItemInDB);
let editButtonElement = document.getElementById('edit-meal');
editButtonElement.addEventListener('click', pushItemInDB);

let mealListElement = document.getElementById('list');

const baseUrl = 'http://localhost:3030/jsonstore/tasks';

const loadMealsButton = document.getElementById('load-meals');
loadMealsButton.addEventListener('click', load);


function load() {
    mealListElement.innerHTML = '';
    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            for (let id in data) {
                mealListElement.appendChild(getNewMealDomElement(data[id]));
            }
        });
    editedElementId = null;
    editButtonElement.setAttribute('disabled', 'disabled');
    addButtonElement.removeAttribute('disabled');
}

function deleteFromBD() {
    fetch(baseUrl + `/${editedElementId}`, {
        method: 'DELETE'
    });
    //TODO DELETE
    load();
    editedElementId = null;
}

function pushItemInDB() {
    let meal = {
        food: foodInputElement.value,
        calories: caloriesInputElement.value,
        time: timeInputElement.value,
    }

    if (editedElementId !== null) {
        fetch(baseUrl + `/${editedElementId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(meal),
        });
        // TODO PUT

        editButtonElement.setAttribute('disabled', 'disabled');
        addButtonElement.removeAttribute('disabled');
    } else {
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(meal),
        });
        // TODO POST
    }

    load();
    foodInputElement.value = '';
    caloriesInputElement.value = '';
    timeInputElement.value = '';
    editedElementId = null;
}

function getNewMealDomElement(meal) {
    let food = meal.food;
    let calories = meal.calories;
    let time = meal.time;
    let id = meal._id;

    let newMealForm = mealElement.cloneNode(true);

    newMealForm.querySelector('h2').textContent = food;
    newMealForm.querySelector('h3:nth-child(2)').textContent = time;
    newMealForm.querySelector('h3:nth-child(3)').textContent = calories;

    let changeButtonElement = newMealForm.querySelector('button.change-meal');

    changeButtonElement.addEventListener('click', () => {
        foodInputElement.value = food;
        caloriesInputElement.value = calories;
        timeInputElement.value = time;
        editedElementId = id;

        addButtonElement.setAttribute('disabled', 'disabled');
        editButtonElement.removeAttribute('disabled');

        newMealForm.remove();
    });

    let deleteButtonElement = newMealForm.querySelector('button.delete-meal');

    deleteButtonElement.addEventListener('click', () => {
        editedElementId = id;
        deleteFromBD();
    })

    newMealForm.style.display = 'flex';

    return newMealForm;
}