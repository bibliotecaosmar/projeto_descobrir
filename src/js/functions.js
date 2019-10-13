/**
 *  System Variables
 * =====================================================================
 */
const slots     = ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6']
const cards     = ['saber', 'archer', 'lancer', 'saber', 'archer', 'lancer']
// const slots.length = slots.lenght
// const cards.length    = cards.lenght
let permission  = true


/**
 *  System Functions
 * =====================================================================
 */
const NOT   = (condition) => !condition
const HTML  = (value, prefix = '') => ( document.getElementById(prefix + value) ) // require high order function

const ifNotHasInArray = (array, value) => ( array.indexOf(value) === -1 )
const ifInRange       = (array, range) => ( range >= array.length )

/**
 *  Subprocess Functions
 * =====================================================================
 */
// Mathematical ~
const randomNum = (weight = 10) => 
  ( Math.floor( Math.random() * weight ).toString() )

// DOM elements ~
const lockAll             = () => ( permission = false )
const unlockAll           = () => ( permission = true )
const addLocked           = (card) => ( ['locked_', card].join('') )

const addSetdown          = (card) => ( ['setdown_', card].join('') )
const removeSetdown       = (card) => ( card.split('_')[1] )

const currentPoints       = () => ( parseInt( HTML('Points').innerHTML ) )
const addPoints           = (points, pointToGain) =>
  ( HTML('Points').innerHTML = pointToGain(points) )
const deductPoints        = (points, pointToLose) =>
  ( HTML('Points').innerHTML = pointToLose(points) )

/**
 *  Services(Business Rules)
 * ===================================================================== 
 */
const setCards = (order, slots = slots) => {
  for(let i = 0; i < slots.length; i++) {
    HTML([i]).className = 'setdown_'+order[i]
  }
}
 const setCardsNotLockeds = (slots = slots) => {
  for(let i = 0; i < slots.length; i++) {
    card = HTML([i]).className
    if( NOT( ifNotHasInArray(card, 'setdown_') ) || 
        NOT( ifNotHasInArray(card, 'locked_') ) ) {
      HTML([i]).className = addSetdown(card)
    }
  }
}
const comparator = (slots = slots) => {
  let flippedCards = []
  for(let i = 0; i < slots.length; i++) {
    card = HTML( slots[i] ).className
    if( ifNotHasInArray( card,'setdown_' ) || 
        ifNotHasInArray(card, 'locked_') ) {
      flippedCards.push(card)
    }
  }
  return true ? (cards[0] == cards[1]) : false
}
const lockCards = (slots = slots) => {
  for(let i = 0; i < slots.length; i++) {
    card = HTML( slots[i] ).className
    if( NOT( ifNotHasInArray(card, 'setdown_') ) || 
        NOT( ifNotHasInArray(card, 'locked_') ) ) {
      HTML( slots[i] ).className = addLocked(card)
    }
  }
  HTML('FlippedCards').innerHTML = "0"
}
const sequencialIntNoRepeated = (range, array = []) => {
  while(array.length < range) {
    let x = randomNum()
    if( NOT( ifNotHasInArray( array, x ) ) || 
             ifInRange( array, range ) ) {
      array.push(x)
    }
  }
  return array
}
const success = () => {
  addPoints()
  lockCards()
}
const fail = () => {
  deductPoints()
  resetChance()
}
const checkFlips = (success = success,
                    fail = fail, 
                    comparator = comparator, 
                    lockAll = lockAll, 
                    unlockAll = unlockAll) => {
  if( HTML('FlippedCards').innerHTML == 2 ) {
    if( comparator() ) {
      success()
    }else {
      lockAll()
      time = setTimeout( ()=>{fail(); unlockAll(); clearTimeout(time)}, 2000 )
    }
  }
}

/**
 *  Features
 * ===================================================================== 
 */
function shuffle(elements) {
  let newOrder = []
  let sequence = sequencialIntNoRepeated(elements.length)

  for(let i = 0; i < cards.length; i++) {
    newOrder[i] = cards[parseInt(sequence[i])]
  }
  
  setCards(newOrder, elements)
  HTML('Screen').setdown = false
  HTML('start').innerHTML = "Shuffle"
}

function flip(slot, permission) {
  if(permission) {
    card = HTML(slot, 'item-').className
    cardsFlippeds = parseInt(HTML('FlippedCards').innerHTML)
  
    if( ifNotHasInArray(card, 'setdown_') ) {
      HTML(slot, 'item-').className = removeSetdown(card)
      ++cardsFlippeds
      HTML('FlippedCards').innerHTML = cardsFlippeds.toString()
    }
    checkFlips()
  }
}

function resetChance(setCardsNotLockeds) {
  setCardsNotLockeds()
  HTML('FlippedCards').innerHTML = "0"
}