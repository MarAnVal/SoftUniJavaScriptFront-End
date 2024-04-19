window.addEventListener("load", solve);

function solve() {
    // Title, category, and content should be non-empty strings. If any of them are empty, the program should not do anything.
    let inputDomElements = {
        titleInputElement: document.getElementById('task-title'),
        categoryInputElement: document.getElementById('task-category'),
        contentInputElement: document.getElementById('task-content'),
    }

    let listElements = {
        reviewListElement: document.getElementById('review-list'),
        publishListElement: document.getElementById('published-list'),
    }

    let publishButtonElement = document.getElementById('publish-btn');
    publishButtonElement.addEventListener('click', createReview);

    let posts = {};
    let counter = 0;

    function createReview() {
        let title = inputDomElements.titleInputElement.value;
        let category = inputDomElements.categoryInputElement.value;
        let content = inputDomElements.contentInputElement.value;
        if (title && category && content) {
            let id = generateId();
            posts[id] = {
                title,
                category,
                content,
                id,
                status: 'review',
            };

            clearInput();
            loadPosts();
        }
    }

    function getNewReviewElement(post) {
        let liElement = getNewPublishElement(post);

        let editButtonElement = document.createElement('button');
        editButtonElement.classList.add('action-btn', 'edit')
        editButtonElement.textContent = 'Edit';
        editButtonElement.addEventListener('click', edit)
        liElement.appendChild(editButtonElement);

        let postButtonElement = document.createElement('button');
        postButtonElement.classList.add('action-btn', 'post')
        postButtonElement.textContent = 'Post';
        postButtonElement.addEventListener('click', postElement)
        liElement.appendChild(postButtonElement);

        return liElement;
    }

    function getNewPublishElement(post) {
        let liElement = document.createElement('li');
        liElement.classList.add('rpost');
        liElement.setAttribute('id', post.id);

        let articleElement = document.createElement('article');
        liElement.appendChild(articleElement);

        let h4Element = document.createElement('h4');
        h4Element.textContent = post.title;
        articleElement.appendChild(h4Element);

        let p1Element = document.createElement('p');
        p1Element.textContent = `Category: ${post.category}`;
        articleElement.appendChild(p1Element);

        let p2Element = document.createElement('p');
        p2Element.textContent = `Content: ${post.content}`;
        articleElement.appendChild(p2Element);

        return liElement;
    }

    function loadPosts() {
        listElements.reviewListElement.innerHTML = '';
        listElements.publishListElement.innerHTML = '';

        for (let postId in posts) {
            if (posts[postId].status === 'review') {
                let newReviewElement = getNewReviewElement(posts[postId]);
                listElements.reviewListElement.appendChild(newReviewElement);
            } else {
                let newReviewElement = getNewPublishElement(posts[postId]);
                listElements.publishListElement.appendChild(newReviewElement);
            }
        }
    }

    function postElement(e) {
        let postId = e.target.parentElement.id;
        posts[postId].status = 'posted';
        loadPosts();
    }

    function edit(e) {
        let postId = e.target.parentElement.id;

        inputDomElements.titleInputElement.value = posts[postId].title;
        inputDomElements.contentInputElement.value = posts[postId].content;
        inputDomElements.categoryInputElement.value = posts[postId].category;

        delete posts[postId];

        loadPosts();
    }

    function generateId() {
        counter++;
        return counter;
    }

    function clearInput() {
        for (let element in inputDomElements) {
            inputDomElements[element].value = '';
        }
    }
}