//declare global variables/array/objects
let cards = [] //array
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ``
let player = {
    name: "You",
    chips: 0,
    bet: 0,
}

//reference elements in html
let messageEl = document.getElementById(`message-el`)
let sumEl = document.getElementById(`sum-el`)
let cardsEl = document.getElementById(`cards-el`)
let playerEl = document.getElementById("player-el")
let betEl = document.getElementById("bet-el")



//Functions / Code
renderBalance()
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
        if (player.chips > 0) {
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
        } else {
            messageEl.textContent = `You don't even enough cents for chicken nuggets, dude.
            STOP`
        }
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
        player.chips += (player.bet*2) 
        player.bet = 0
        hasBlackJack = true
    } else {
        message = `You're out of the game!`
        player.chips -= (player.bet)
        player.bet = 0
        isAlive = false
    }
    //display the message
    messageEl.textContent = message  

    //display player balance
    renderBalance()
}

function renderBalance() {
    playerEl.textContent = `${player.name}: R${player.chips}`
    if (player.bet === player.chips && player.chips<0) {
        betEl.textContent = `All in!`
    } else {
    betEl.textContent = `Bet: R${player.bet}`
    }
}

function newCard() {
    console.log(`Drawing a new card from the deck!`)
    if (isAlive === true && hasBlackJack === false) {
        //declare local variable for function
        let card = getRandomCard()

        //add the new card value to cards array & sum var
        cards.push(card)
        sum += card
        renderGame()
    }
}

function bet(method) {
    if (method === "add" && player.bet < player.chips) {
        player.bet += 10
    } else if(method === "min" && player.bet > 0) {
        player.bet -= 10
    }

    renderBalance()
}