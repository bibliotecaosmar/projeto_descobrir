/**
 *  System Variables
 * =====================================================================
 */
const slotNumber = 20

function slots() {
  let slots = []
  for(let i = 0; i < 20; i++) {
    slots.push(['slot-', i.toString()].join())
  }
}

let permission  = true


/**
 *  System Functions
 * =====================================================================
 */
const NOT   = (condition) => !condition
const HTML  = (value, prefix = '') => ( document.getElementById(prefix + value) ) // require high order function

const hasInArray = (array, value) => ( true ? (array.indexOf(value) === -1) : false )
const inRange    = (array, range) => ( range >= array.length )

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
const setCards = (order) => {
  for(let i = 0; i < slotsNumber; i++) {
    HTML((i+1), 'slot-').className = 'setdown_slot-'+order[i]
  }
}
const setCardsNotLockeds = () => {
  for(let i = 0; i < slotNumber; i++) {
    card = HTML([i]).className
    if( NOT( hasInArray( card, 'setdown_' ) &&
             hasInArray( card, 'locked_' ) ) ) {
      HTML([i]).className = addSetdown(card)
    }
  }
}
const comparator = (slots) => {
  let flippedCards = []
  for(let i = 0; i < slots.length; i++) {
    card = HTML( slots[i] ).className
    if( NOT( hasInArray( card, 'setdown_' ) &&
             hasInArray( card, 'locked_' ) ) ) {
      flippedCards.push( card )
    }
  }
  return true ? (cards[0] == cards[1]) : false
}
const lockCards = (slots) => {
  for(let i = 0; i < slots.length; i++) {
    card = HTML( slots[i] ).className
    if( NOT( hasInArray( card, 'setdown_' ) &&
             hasInArray( card, 'locked_' ) ) ) {
      HTML( slots[i] ).className = addLocked(card)
    }
  }
  HTML('FlippedCards').innerHTML = "0"
}
const sequencialIntNoRepeated = (range, array = []) => {
  while(array.length < range) {
    let x = randomNum()
    if( NOT( hasInArray( array, x ) ) ||
             inRange( array, range ) ) {
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
const checkFlips = () => {
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
function start(sequence) {

  HTML('main-button').style.display = "none"
}

function shuffle() {
  let newOrder = map(parseInt, sequencialIntNoRepeated(slotsNumber))
  
  setCards(newOrder)

  HTML('Screen').setdown = false
  HTML('start').innerHTML = "Shuffle"
}

function flip(slot) {
  if(permission) {
    card = HTML(slot, 'slot-').className
    cardsFlippeds = parseInt(HTML('FlippedCards').innerHTML)
  
    if( hasInArray(card, 'setdown_') ) {
      HTML(slot, 'slot-').className = removeSetdown(card)
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