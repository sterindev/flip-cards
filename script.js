document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restartButton');
    const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let flippedCards = [];
    let matchedCards = [];

  
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

  
    function createCards() {
        shuffle(cardValues);
        cardValues.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="front">${value}</div>
                <div class="back"></div>
            `;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    // Flip card function
    function flipCard() {
        if (flippedCards.length === 2) return;
        this.classList.add('flip');
        flippedCards.push(this);
        
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    // Check  function
    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const isMatch = card1.innerHTML === card2.innerHTML;

        if (isMatch) {
            matchedCards.push(card1, card2);
            flippedCards = [];
        } else {
            setTimeout(() => {
                card1.classList.remove('flip');
                card2.classList.remove('flip');
                flippedCards = [];
            }, 1000);
        }
    }

    // Restart the game
    function restartGame() {
        gameBoard.innerHTML = '';
        flippedCards = [];
        matchedCards = [];
        createCards();
    }


    createCards();


    restartButton.addEventListener('click', restartGame);
});