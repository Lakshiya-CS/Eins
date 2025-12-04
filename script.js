
let deck = [];
let stack = [];
let userHand = [];
let comHand = [];
let turn = "user";

function resetBoard() {
     console.log("Resetting board...");

    deck = buildDeck();
    shuffleDeck(deck);

    userHand = [];
    comHand = [];
    stack = [];

    const STARTING_CARDS = 5;
    for (let i = 0; i < STARTING_CARDS; i++) {
        userHand.push(deck.pop());
        comHand.push(deck.pop());
    }

    stack.push(deck.pop());

    turn = "user";

    displayBoard();
    updateStatus("Your turn.");

}

function displayBoard() {
    const userDiv = document.getElementById("userHand");
    const comDiv = document.getElementById("comHand");
    const deckDiv = document.getElementById("deck");
    const stackDiv = document.getElementById("stack");

    userDiv.innerHTML = "";
    comDiv.innerHTML = "";
    deckDiv.innerHTML = "";
    stackDiv.innerHTML = "";

    // user hand
    for (let i = 0; i < userHand.length; i++) {
        const card = userHand[i];
        const cardElem = renderCard(card);
        cardElem.classList.add("user-card");

        // play card 
        cardElem.onclick = function () {
            attemptPlayUserCard(i);
        };

        // dragging
        cardElem.draggable = true;            
        cardElem.dataset.index = i;           

        cardElem.addEventListener("dragstart", function (e) {
            draggedCardIndex = parseInt(e.target.dataset.index);
        });

        userDiv.appendChild(cardElem);
    }

    // PC hand
    for (let i = 0; i < comHand.length; i++) {
        const back = renderCardBack();
        comDiv.appendChild(back);
    }

    // deck
    if (deck.length > 0) {
        const back = renderCardBack();
        deckDiv.appendChild(back);
    } else {
        deckDiv.textContent = "No cards";
    }

    if (stack.length > 0) {
        const topCard = stack[stack.length - 1];
        const topElem = renderCard(topCard);
        stackDiv.appendChild(topElem);
    }

    // stack drop place/point
    stackDiv.addEventListener("dragover", function (e) {
        e.preventDefault(); // allow dropping here
    });

    stackDiv.addEventListener("drop", function (e) {
        e.preventDefault();
        if (draggedCardIndex === null) return;

        attemptPlayUserCard(draggedCardIndex);
        draggedCardIndex = null;
    });
}


function comTurn() {
    if (turn !== "com") return;

    // choose card / draw card
    displayBoard();
    turn = "user";
}
