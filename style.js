var suits = ["diamonds", "hearts", "spades", "clubs"];
var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var deck = new Array();
var choosen = new Array();
var myModal;

function createDeck() {
    var deck = new Array();

    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < cards.length; j++) {
            var card = { Value: cards[j], Suit: suits[i] };
            deck.push(card);
        }
    }
    // console.log(deck);
    return deck;
}
function drawCard(num) {
    var rand = new Array();
    var num;
    var show = new Array();
    if (choosen.length == deck.length) {
        console.log("no more choices");
        var x = document.getElementById("noCards");
        x.style.display = "none";
        var y = document.getElementById("noCardsImg");
        y.style.display = "flex";
        // document.getElementById("no-cards").style.display = "block";
    }
    else {
        if (choosen.length <= deck.length - 4) {
            while (rand.length < num) {
                var r = Math.floor(Math.random() * deck.length);
                if (rand.indexOf(r) === -1 && choosen.indexOf(r) === -1) {
                    rand.push(r);

                }
            }
        }
        else {
            // console.log("less choices");
            for (var i = 0; i < deck.length; i++) {
                if (choosen.indexOf(i) === -1) {
                    show.push(deck[i]);
                    choosen.push(i);

                }
            }
        }
    }

    for (var i = 0; i < rand.length; i++) {
        show.push(deck[rand[i]]);
    }
    choosen = choosen.concat(rand);
    // console.log(rand);
    // console.log(choosen);
    // console.log(deck);
    renderDeck(deck, "deck");
    renderDrawnDeck(show, "draw-deck");

}



function shuffleCards() {
    for (var i = 0; i < deck.length; i++) {
        var card1 = Math.floor((Math.random() * deck.length));
        var card2 = Math.floor((Math.random() * deck.length));

        while (choosen.indexOf(card1) !== -1) {
            card1 = Math.floor((Math.random() * deck.length));

        }
        while (choosen.indexOf(card2) !== -1) {
            card2 = Math.floor((Math.random() * deck.length));

        }
        var tmp = deck[card1];

        deck[card1] = deck[card2];
        deck[card2] = tmp;
    }

    renderDeck(deck, "deck");
}


function showHtml(ele, elementId) {
    var card = document.createElement("div");
    var valuel = document.createElement("div");
    var suit = document.createElement("img");
    var valuer = document.createElement("div");

    card.className = "card";
    valuel.className = "value-l";
    suit.className = "suit " + ele.Suit;
    valuer.className = "value-r";

    suit.src = "images/" + ele.Suit + ".png"
    valuel.innerHTML = ele.Value;
    valuer.innerHTML = ele.Value;


    card.appendChild(valuel);
    card.appendChild(suit);
    card.appendChild(valuer);


    document.getElementById(elementId).appendChild(card);
}
function renderDrawnDeck(arr, elementId) {

    document.getElementById(elementId).innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
        showHtml(arr[i], elementId);

    }
}


function renderDeck(arr, elementId) {
    document.getElementById(elementId).innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
        if (choosen.indexOf(i) === -1) {
            showHtml(arr[i], elementId);
        }
    }
    // console.log('print the array', arr, elementId);

}

function loadCards() {
    var x = document.getElementById("noCards");
    x.style.display = "block";
    var y = document.getElementById("noCardsImg");
    y.style.display = "none";
    choosen = [];

    deck = createDeck();
    shuffleCards();
    renderDeck(deck, "deck");
}

window.onload = loadCards;