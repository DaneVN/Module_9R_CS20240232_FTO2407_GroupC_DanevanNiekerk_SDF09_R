//declare global variables
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ``
let messageEl = document.getElementById(`message-el`)
let sumEl = document.getElementById(`sum-el`)
let cardsEl = document.getElementById(`cards-el`)

function getRandomCard() { //get a random number beetween 2 and 12(including 12)
    let randomNumer = Math.floor( Math.random()*13 ) + 1
    if (randomNumer > 10) {
        return 10
    } else if (randomNumer === 1) {
        return 11
    } else {
        return randomNumer
    }
}

function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards.push(firstCard, secondCard)
    sum = firstCard + secondCard
    renderGame() 
}

function renderGame() {
    //display the sum and cards in the p tags
    cardsEl.textContent = `Cards:  `
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += `${cards[i]} `
    }
    sumEl.textContent = `Sum: ` + sum
    //Determine where the player is with their blackjack
    if (sum <= 20) { //
        message = `Do you want to draw a new card?`
    } else if (sum === 21) {
        message = `Wohoo! You've got Blackjack!`
        hasBlackJack = true
    } else {
        message = `You're out of the game!`
        isAlive = false
    }
    //display the message
    messageEl.textContent = message  
}

function newCard() {console.log(`Drawing a new card from the deck!`)
    if (isAlive === true && hasBlackJack === false) {
        //declare local variable for function
        let card = getRandomCard()
        //add the new card value to cards array & sum var
        cards.push(card)
        sum += card
        renderGame()
    }
}