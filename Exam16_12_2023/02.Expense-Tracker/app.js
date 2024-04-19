window.addEventListener("load", solve);

function solve() {
    let expenseInputElement = document.getElementById('expense');
    let amountInputElement = document.getElementById('amount');
    let dateInputElement = document.getElementById('date');

    let previewListElement = document.getElementById('preview-list');

    let addButtonElement = document.getElementById('add-btn');

    addButtonElement.addEventListener('click', () => {
        let expense = expenseInputElement.value;
        let amount = amountInputElement.value;
        let date = dateInputElement.value;

        if(!expense || !amount || !date){
            return;
        }

        let liPreviewElement = getLiPreviewElement(expense, amount, date);
        previewListElement.appendChild(liPreviewElement);

        addButtonElement.setAttribute('disabled', 'disabled');

        cleanInputFields();
    })

    let deleteButtonElement = document.querySelector('button.delete');
    deleteButtonElement.addEventListener('click', () => {
        let expensesListElement = document.getElementById('expenses-list');
        expensesListElement.innerHTML = '';
    })

    function getLiPreviewElement(expense, amount, date) {
        let liElement = document.createElement('li');
        liElement.classList.add('expense-item');

        let articleElement = document.createElement('article');
        liElement.appendChild(articleElement);

        let p1 = document.createElement('p');
        p1.textContent = `Type: ${expense}`
        articleElement.appendChild(p1);
        let p2 = document.createElement('p');
        p2.textContent = `Amount: ${amount}$`;
        articleElement.appendChild(p2);
        let p3 = document.createElement('p');
        p3.textContent = `Date: ${date}`;
        articleElement.appendChild(p3);

        let divElement = document.createElement('div');
        divElement.classList.add('buttons');
        liElement.appendChild(divElement);

        let editButtonElement = document.createElement('button');
        editButtonElement.textContent = 'edit';
        editButtonElement.classList.add('btn', 'edit');
        divElement.appendChild(editButtonElement);

        editButtonElement.addEventListener('click', () => {
            liElement.remove();
            expenseInputElement.value = expense;
            amountInputElement.value = amount;
            dateInputElement.value = date;
            addButtonElement.removeAttribute('disabled');
        })

        let okButtonElement = document.createElement('button');
        okButtonElement.textContent = 'ok';
        okButtonElement.classList.add('btn', 'ok');
        divElement.appendChild(okButtonElement);

        okButtonElement.addEventListener('click', () => {
            divElement.remove();
            let expensesListElement = document.getElementById('expenses-list');
            expensesListElement.appendChild(liElement);
            addButtonElement.removeAttribute('disabled');
        })

        return liElement;
    }

    function cleanInputFields() {
        expenseInputElement.value = '';
        amountInputElement.value = '';
        dateInputElement.value = '';
    }
}