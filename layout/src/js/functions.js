/**
 *  System Functions
 * =====================================================================
 */
const NOT				= (condition) => !condition
const HTML  			= (value, prefix = '') => ( document.getElementById(prefix + value) )

const hasInArray 		= (array, value) => ( true ? (array.indexOf(value) === -1) : false )
const inRange    		= (array, range) => ( range >= array.length )

const pushNotHaving		= (array, value) => ( array.push(value) ? (array.indexOf(value) === -1) : array
const stringPlusNumber 	= (string, number) => ( [string, number.toString()].join() )

/**
 *  System Variables
 * =====================================================================
 */
const slots = () => {
  let slots = []
  for(let i = 0; i < 20; i++) {
    slots.push( stringPlusNumber('slot-', i) )
  }
}
const slotNumber = () => ( slot().length )

const cards = () => {
  let card     = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9', 'card10']
  let exemplar = []
  for(let i = 0; i < slotNumber/2; i++) {
	let y = (i*2)
	let x = (i*2)+1
    exemplar.push(card[y])
	exemplar.push(card[x])
  }
}

let chances		 = []
let permission   = true
let bonusStack   = []
let bonusList    = [
  {card: 'closeButton', bonus: 'Botão de Fechar Windows', status: 'inative', where: []},
]

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
const addPoints           = ( points, pointToGain) => ( HTML('Points').innerHTML = pointToGain(points) )
const deductPoints        = ( points, pointToLose) => ( HTML('Points').innerHTML = pointToLose(points) )

const incrementChance	  = (card) => ( chances.push(card) )

/**
 *  Services(Business Rules)
 * ===================================================================== 
 */
// Generators
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
// Bonus
const stackBonus = (bonus) => ( bonusStack.push(bonus) )
const drawBonus  = (bonus) => ( bonusStack..remove(bonus) )
const checkBonus = () => {
  for(let i; i < chance.length; i++) {
    // checa se existem 2 elementos
	// se sim, estaca nos bonus
  }
}
// Cards
const setCards = (order) => {
  for(let i = 0; i < slotNumber; i++) {
    HTML((i+1), 'slot-').className = 'setdown_'+( cards()[order[i]] )
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
// Chances
const attempt	  = () => ( HTML('attempt').innerHTML = parseInt(HTML('attempt').innerHTML)++ )
const resetChance = () => {
  setCardsNotLockeds()
  HTML('FlippedCards').innerHTML = "0"
}
const success 	  = () => {
  addPoints()
  lockCards()
}
const fail 		  = () => {
  deductPoints()
  resetChance()
}
const checkFlips  = () => {
  if( HTML('FlippedCards').innerHTML == 2 ) {
    if( comparator() ) {
      success()
    }else {
      lockAll()
      time = setTimeout( ()=>{fail(); unlockAll(); clearTimeout(time)}, 2000 )
    }
	attempt()
  }
}

/**
 *  Features
 * ===================================================================== 
 */
function startGame() {
  newOrder = []
  sequence = sequencialIntNoRepeated(slotNumber)

  for(let i = 0; i < sequence.length; i++) {
    newOrder.push(parseInt(sequence[i]))
  }
  
  setCards(newOrder)
  
  HTML('main-button').style.display = "none"
}

function flip(slot) {
  if(permission) {
    card = HTML(slot, 'slot-').className
    cardsFlippeds = parseInt(HTML('FlippedCards').innerHTML)
	
	if( NOT( hasInArray(chances, card) ) ) {
	  incrementChance(card)
	}
  
    if( hasInArray(card, 'setdown_') ) {
      HTML(slot, 'slot-').className = removeSetdown(card)
      ++cardsFlippeds
      HTML('FlippedCards').innerHTML = cardsFlippeds.toString()
    }
    checkFlips()
	checkBonus()
  }
}