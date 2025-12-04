class Card {
    #color;
    #number;
    #cardId;

    static numCards = 0;

    constructor(color, number){
        this.#color = color;
        this.#number = number;
        this.#cardId = Card.numCards;

        numCards++;
    }
}

class Player {
    #name;
    hand;

    constructor(name){
        this.#name = name;
        this.hand = [];
    }

    get name(){
        return this.#name;
    }
    playCard(cardId, discard){
        if (turn = this.name){
            for (c of hand){
                if (c.cardId = cardId){
                    if (discard[0].value == c.value || discard[0].color == c.color){
                        discard.push(this.hand.splice(this.hand.indexOf(c)));
                    }
                }
            }
        }
    }
    drawCard(deck, turn){
        if (turn = this.name){
            this.hand.push(deck.pop());
        }
    }
}


let deck = [];
let player = new Player("Player");
let com = new Player("Computer");
let discard = [];

colors = ['red', 'blue', 'green', 'yellow']

// populate deck
for (let i = 0; i < 10; i++){
    for (color of colors) {
        deck.push(new Card(color, i));
        if (i != 0) deck.push(new Card(color, i));
    }
}

// shuffle deck order
for (let i = deck.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
}

console.log(deck);

// initial hand draws
for (let i = 0; i < 7; i++){
    player.drawCard(deck);
    com.drawCard(deck);
}

console.log("hand1",player.hand);
console.log("hand2",com.hand);

console.log("Deck length:", deck.length);
