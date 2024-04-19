window.addEventListener("load", solve);

function solve() {
    let inputFiledElements = {
        playerInputElement: document.getElementById('player'),
        scoreInputElement: document.getElementById('score'),
        roundInputElement: document.getElementById('round'),
    }

    let addButtonElement = document.getElementById('add-btn');
    addButtonElement.addEventListener('click', createItem);

    let clearButtonElement = document.querySelector('button.btn.clear');
    clearButtonElement.addEventListener('click', cleanBoard);

    let listElements = {
        sureListElement: document.getElementById('sure-list'),
        scoreboardListElement: document.getElementById('scoreboard-list'),
    }

    function createItem() {
        let player = inputFiledElements.playerInputElement.value;
        let score = inputFiledElements.scoreInputElement.value;
        let round = inputFiledElements.roundInputElement.value;

        if (player && score && round) {
            let turn = {
                player,
                score,
                round,
            }

            listElements.sureListElement.appendChild(getNewSureLiElement(turn));

            cleanInputFields();

            addButtonElement.setAttribute('disabled', 'disabled');
        }
    }

    function getNewSureLiElement(turn) {
        let liElement = document.createElement('li');
        liElement.classList.add('dart-item');

        let articleElement = document.createElement('article');

        let pPlayerElement = document.createElement('p');
        pPlayerElement.textContent = turn.player;
        articleElement.appendChild(pPlayerElement);

        let scorePlayerElement = document.createElement('p');
        scorePlayerElement.textContent = 'Score: ' + turn.score;
        articleElement.appendChild(scorePlayerElement);

        let roundPlayerElement = document.createElement('p');
        roundPlayerElement.textContent = 'Round: ' + turn.round;
        articleElement.appendChild(roundPlayerElement);

        liElement.appendChild(articleElement);

        let editButtonElement = document.createElement('button');
        editButtonElement.classList.add('btn', 'edit');
        editButtonElement.textContent = 'edit';
        editButtonElement.addEventListener('click', (e) => editItem(e, turn));
        liElement.appendChild(editButtonElement);

        let okButtonElement = document.createElement('button');
        okButtonElement.classList.add('btn', 'ok');
        okButtonElement.textContent = 'ok';
        okButtonElement.addEventListener('click', doneItem);
        liElement.appendChild(okButtonElement);

        return liElement;
    }

    function editItem(e, turn) {
        let liElement = e.currentTarget.parentElement;
        liElement.remove();

        inputFiledElements.playerInputElement.value = turn.player;
        inputFiledElements.scoreInputElement.value = turn.score;
        inputFiledElements.roundInputElement.value = turn['round'];

        addButtonElement.removeAttribute('disabled');
    }

    function doneItem(e) {
        let liElement = e.currentTarget.parentElement;
        let editButtonElement = liElement.querySelector('button.edit');
        let okButtonElement = e.currentTarget;
        editButtonElement.remove();
        okButtonElement.remove();

        listElements.scoreboardListElement.appendChild(liElement);

        addButtonElement.removeAttribute('disabled');
    }

    function cleanBoard() {
        listElements.scoreboardListElement.innerHTML = '';
        listElements.sureListElement.innerHTML = '';
        cleanInputFields();
    }

    function cleanInputFields() {
        for (let field in inputFiledElements) {
            inputFiledElements[field].value = '';
        }
    }
}


  