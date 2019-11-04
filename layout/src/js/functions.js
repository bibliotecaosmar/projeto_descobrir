/**
 *  System Functions
 * =====================================================================
 */
const NOT		            = (condition) => !condition
const HTML            	= (value, prefix = '') => ( document.getElementById(prefix + value) )

const inRange    	      = (array, range) => ( range >= array.length )
const hasTwoInArray     = (array, value) => {
  let count = 0
  for(let i = 0; i < array.length; i++) {
    if(array[i] === value){
      count++
    }
  }
  return (count >= 2) ? true : false
}

const pushNotHaving		  = (array, value) => ( array.push(value) ? ( array.includes(value) ) : array)
const stringPlusNumber 	= (string, number) => ( [string, number.toString()].join('') )

/**
 *  System Variables
 * =====================================================================
 */
const delayGamePlay = 1500
const delayStartGame = 3000

const cards  = [
  'card-chrome',
  'card-chrome',
  'card-email',
  'card-email',
  'card-estabilizador',
  'card-estabilizador',
  'card-google',
  'card-google',
  'card-notebook',
  'card-notebook',
  'card-virus',
  'card-virus',
  'card-windows',
  'card-windows',
  'card-word',
  'card-word',
]
const slots = [
  'slot-1',
  'slot-2',
  'slot-3',
  'slot-4',
  'slot-5',
  'slot-6',
  'slot-7',
  'slot-8',
  'slot-9',
  'slot-10',
  'slot-11',
  'slot-12',
  'slot-13',
  'slot-14',
  'slot-15',
  'slot-16',
]
const cardNumber = cards.length
const slotNumber = slots.length

let slotsContent  = [
  'set',
  'set',
  'set',
  'set',
  'set',
  'set',
  'set',
  'set',
  'set',
  'set',
  'set',
  'set',
  'set',
  'set',
  'set',
  'set',
  'set',
  'set',
  'set',
  'set',
]
let sequence	    = []
let chances		    = []
let permission    = false
let bonus         = {'has': false}
let bonusStack    = []
let bonusList     = [
  {'card': 'linux-card', 'request': 'É um OS OpenSorce'},
  {'card': 'google-card', 'request': 'Ferramenta de pesquisar'},
  {'card': 'cpu-card', 'request': 'É o núcleo do computador'},
  {'card': 'gps-card', 'request': 'Usado para se localizar'}
]

/**
 *  Subprocess Functions
 * =====================================================================
 */
// Mathematical ~
const randomNum = (size) => ( Math.floor( Math.random() * size ) )
// Points
const pointToGain   = (points, bonus = false) => ( bonus ? points+10 : points+5 )
const pointToLose   = (points) => { 
  if(points >= 2){
    return --points
  }
  return 0 
}
const currentPoints = () => ( parseInt( HTML('points').innerHTML ) )
const addPoints     = () => ( HTML('points').innerHTML = pointToGain(parseInt(HTML('points').innerHTML)) )
const deductPoints  = () => ( HTML('points').innerHTML = pointToLose(parseInt(HTML('points').innerHTML)) )
const incrementBonusPoint = () => ( HTML('points').innerHTML = pointToGain(parseInt(HTML('points').innerHTML), true) )
// DOM elements ~
const lockAll       = () => { permission = false }
const unlockAll     = () => { permission = true }

const addLocked     = (card) => ( ['locked_', card].join('') )
const addSetdown    = (card) => ( ['setdown_', card].join('') )
const removeStates  = (card) => {
  if( card.includes('setdown_') || card.includes('locked_') ) {
    return card.split('_')[1]
  }
  return card
}
const returnCards   = (chanceSlots) => ( chanceSlots.map(c => ( HTML(c).className ) ) )
const resetChances  = () => ( chances = [] )
const incrementChances	  = (slot) => {
  if( NOT( chances.includes(slot) ) ){
    chances.push(slot)
  }
}

/**
 *  Services(Business Rules)
 * ===================================================================== 
 */
// Generators
const createSequence      = () => {
  let array = []
  while( array.length < slotNumber) {
    let x = randomNum(slotNumber)
    if( NOT( array.includes(x) ) ) {
      array.push(x)
    }
  }
  return array
}
const updateSlotsContent  = () => ( slotsContent = slots.map( slot => ( HTML(slot).className ) ) )
// Bonus
const newBonus     = (newBonus) => ( bonus = newBonus )
const emptyBonus   = () => ( bonus = {'has': false} )
const stackBonus   = (bonusFound) => {
  if( NOT( bonusStack.some(b => b.card === bonusFound.card ) ) ) {
    bonusStack.push(bonusFound)
  }
}
const drawBonus    = (bonusMatch) => ( bonusStack.remove(bonusMatch) )
const setBonus     = () => {
  if( NOT( bonus.has || bonusStack.length === 0 ) ) {
    newBonus(bonusStack.pop())
    applyBonus()
  }
}
const checkBonus   = (card) => {
  if( NOT( bonus.card === card ) || bonusStack.length != 0 ) {
    emptyBonus()
    return
  }
  incrementBonusPoint()
  newBonus(bonusStack.pop())
  applyBonus()
}
const updateBonus  = () => {
  let chancesStateless = returnCards(chances).map(removeStates)
  bonusList.forEach(bonusItem => {
    let stack = {'card': bonusItem.card, 'request': bonusItem.request, 'has': true}
    if( NOT( hasTwoInArray(chancesStateless, bonusItem.card) ) ||
        bonusStack.includes(stack) ) {
      return
    }
    stackBonus(stack)
  })
}
const applyBonus   = () => ( HTML('bonus-request').innerHTML = bonus.has ? bonus.request : '' )
// Cards
const showAllCards = () => ( slots.forEach( s => ( HTML(s).className = removeStates(HTML(s).className) ) ) )
const setAllCards  = () => ( slots.forEach( s => ( HTML(s).className = addSetdown(HTML(s).className ) ) ) )
const setCards     = (order) => {
  for(let i = 0; i < slotNumber; i++) {
    HTML((i+1), 'slot-').className = 'setdown_'+( cards[order[i]] )
  }
}

const lockCards    = () => {
  for(let i = 0; i < slotNumber; i++) {
    let card = HTML( slots[i] ).className
    if( NOT( card.includes('setdown_') ||
             card.includes('locked_') ) ) {
      HTML( slots[i] ).className = addLocked(card)
    }
  }
  HTML('FlippedCards').innerHTML = "0"
}
const comparator   = () => {
  let flippedCards = []
  for(let i = 0; i < slotNumber; i++) {
    let card = HTML( slots[i] ).className
    if( NOT( card.includes('setdown_') ||
             card.includes('locked_') ) ) {
      flippedCards.push(card)
    }
  }
  if(flippedCards[0] == flippedCards[1]) {
    checkBonus(flippedCards[0])
    return true
  }
  return false
}
const setCardsNotLockeds  = () => {
  for(let i = 0; i < slotNumber; i++) {
    let card = HTML(slots[i]).className
    if( NOT( card.includes('setdown_') ||
             card.includes('locked_') ) ) {
      HTML(slots[i]).className = addSetdown(card)
    }
  }
}
// Chances
const incrementAttempt = () => ( HTML('attempt').innerHTML = parseInt(HTML('attempt').innerHTML)+1 )

const showAll          = () => {
  lockAll()
  showAllCards()
  time = setTimeout( ()=>{setAllCards(); unlockAll(); clearTimeout(time)}, delayStartGame )
}
const success 	       = () => {
  addPoints()
  lockCards()
}
const fail 		         = () => {
  deductPoints()
  resetChance()
}
const resetChance      = () => {
  setCardsNotLockeds()
  HTML('FlippedCards').innerHTML = "0"
}
const checkFlips       = () => {
  if( HTML('FlippedCards').innerHTML == 2 ) {
    if( comparator() ) {
      success()
    }else {
      lockAll()
      time = setTimeout( ()=>{fail(); unlockAll(); clearTimeout(time)}, delayGamePlay )
    }
  incrementAttempt()
  updateSlotsContent()
  checkEndGame()
  setBonus()
  }
}
const checkEndGame     = () => {
  if(slotsContent.every((a) => a.includes('locked_'))) {
    resetGame()
  }
}
const resetGame        = () => {
  permission = false

  resetChances()

  for(let i = 0; i < slotNumber; i++) {
    HTML((i+1), 'slot-').className = 'set'
  }
  HTML('main-button').style.display = 'block'
}
/**
 *  Features
 * ===================================================================== 
 */
function startGame() {
  permission = true

  newOrder = []
  sequence = createSequence()

  for(let i = 0; i < sequence.length; i++) {
    newOrder.push(parseInt(sequence[i]))
  }

  setCards(newOrder)
  HTML('main-button').style.display = "none"
  showAll()
}

function flip(slot) {
  if(permission) {
    card = HTML(slot, 'slot-').className
    cardsFlippeds = parseInt(HTML('FlippedCards').innerHTML)
   
    if( card.includes('setdown_') ) {
      HTML(slot, 'slot-').className = removeStates(card)
      ++cardsFlippeds
      HTML('FlippedCards').innerHTML = cardsFlippeds.toString()
    }

    incrementChances(stringPlusNumber('slot-', slot))
    applyBonus()
    checkFlips()
    updateBonus()
  }
}