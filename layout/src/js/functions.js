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
const delayGamePlay  = 1500
const delayStartGame = 3000
const cards          = [
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
const slots          = [
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
const cardNumber     = cards.length
const slotNumber     = slots.length
const bonusList      = [
  {'card': 'card-chrome', 'request': 'Navegador(Browser) de internet'},
]

// let chances		    = []
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
let permission    = false
let bonus         = {'has': false}
let bonusStack    = bonusList.map(b => ( {'has': true, 'card': b['card'], 'resquest': b.request} ))

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
const noState     = (card) => {
  if( NOT( card.includes('setdown_') ||
           card.includes('locked_') ) ) {
    return true
  }
  return false
}
const returnCards   = (chanceSlots) => ( chanceSlots.map(c => ( HTML(c).className ) ) )
const resetChances  = () => ( chances = [] )
const incrementChances	  = (slot) => {
  if( NOT( chances.includes(slot) ) ){
    chances.push(slot)
  }
}
const successCard         = (slots) => ( slots.map(slot => HTML(slot).className = 'success-card' ) )
const failCard            = (slots) => ( slots.map(slot => HTML(slot).className = 'fail-card' ) )

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
/* const updateBonus  = () => {
  let chancesStateless = returnCards(chances).map(removeStates)
  bonusList.forEach(bonusItem => {
    let stack = {'card': bonusItem.card, 'request': bonusItem.request, 'has': true}
    if( NOT( hasTwoInArray(chancesStateless, bonusItem.card) ) ||
        bonusStack.includes(stack) ) {
      return
    }
    stackBonus(stack)
  })
}*/
/*const stackBonus   = (bonusFound) => {
  if( NOT( bonusStack.some(b => b.card === bonusFound.card ) ) ) {
    bonusStack.push(bonusFound)
  }
}*/
const newBonus     = (newBonus) => ( bonus = newBonus )
const emptyBonus   = () => ( bonus = {'has': false} )
const drawBonus    = (bonusMatch) => ( bonusStack.remove(bonusMatch) )
const setBonus     = () => {
  if( NOT( bonus || bonusStack.length === 0 ) ) {
    newBonus(bonusStack.pop())
    applyBonus()
  }
}
const checkBonus   = (card) => {
  if( bonus['card'] === card ) {
    incrementBonusPoint()
  }
  if( bonusStack.length === 0 ) {
    emptyBonus()
  }
  setBonus()
}
const applyBonus   = () => {
  if(bonus['has']) {
    console.log(bonus['request'])
    HTML('bonus-request').innerHTML = bonus.request
  }
}

// Cards
const getFlippedCards = () => {
  let currentValue = []
  slots.map( (slot) => {
    if( noState(HTML(slot).className) ) {
      currentValue.push(HTML(slot).className)
    }
  })
  return currentValue
}
const getCard         = (cards) => {
  let positions = cards.map( card => slots.filter( slot => ( HTML(slot).className === card ) ? true : false ) )
  return positions[0] === positions[1] ? positions[0] : positions
}
const resumeCard      = (card, slots) => ( slots.map(slot => HTML(slot).className = card ) )
const showAllCards    = () => ( slots.forEach( s => ( HTML(s).className = removeStates(HTML(s).className) ) ) )
const setAllCards     = () => ( slots.forEach( s => ( HTML(s).className = addSetdown(HTML(s).className ) ) ) )
const setCards        = (order) => ( slots.map( (slot, index) => HTML(slot).className = 'setdown_'+ cards[order[index]] ) )

const lockCards       = () => {
  slots.map(slot => {
    if(noState(HTML(slot).className)) {
      HTML(slot).className = addLocked(HTML(slot).className)
    }
  })
  HTML('FlippedCards').innerHTML = "0"
}
const setCardsNotLockeds  = () => {
  slots.map(slot => {
    if( noState( HTML(slot).className ) ) {
      HTML(slot).className = addSetdown(HTML(slot).className)
    }
  })
}

// Chances
const incrementAttempt = () => ( HTML('attempt').innerHTML = parseInt(HTML('attempt').innerHTML)+1 )
const showAll          = () => {
  showAllCards()
  time = setTimeout( ()=>{setAllCards(); unlockAll(); clearTimeout(time)}, delayStartGame )
}
const success 	       = () => {
  lockCards()
  addPoints()  
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
    let flippedCards = getFlippedCards()
    let slots        = getCard(flippedCards)
    
    if( flippedCards[0] == flippedCards[1] ) {
      lockAll()
      checkBonus(flippedCards[0])
      successCard(slots)
      time = setTimeout( ()=>{success(); unlockAll(); resumeCard(card, slots); clearTimeout(time)}, delayGamePlay )
    }else {
      lockAll()
      failCard(slots)
      time = setTimeout( ()=>{fail(); unlockAll(); resumeCard(card, slots); clearTimeout(time)}, delayGamePlay )
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
  slots.map(slot => (HTML(slot).className = 'set'))
  HTML('main-button').style.display = 'block'
}

/**
 *  Features
 * ===================================================================== 
 */
function startGame() {
  let sequence = createSequence()
  let newOrder = sequence.map( item => parseInt(item) )

  setCards(newOrder)
  HTML('main-button').style.display = "none"
  showAll()
  setBonus()
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

    // incrementChances(stringPlusNumber('slot-', slot))
    applyBonus()
    checkFlips()
    setBonus()
    // updateBonus()
  }
}