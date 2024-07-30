//declare global variables/array/objects
let cards = [] //array
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ``
let player = {
    name: "Player",
    chips: 100,
}

//reference elements in html
let messageEl = document.getElementById(`message-el`)
let sumEl = document.getElementById(`sum-el`)
let cardsEl = document.getElementById(`cards-el`)
let playerEl = document.getElementById("player-el")


//Functions / Code

playerEl.textContent = `${player.name}: R${player.chips}`

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
    //initialize
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    
    //clear previous cards from array and add new:
    cards = []
    cards.push(firstCard, secondCard)
    sum = firstCard + secondCard

    //call function to run game
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