/**
 *  Services(Business Rules)
 * ===================================================================== 
 */
// GENERATORS
const createSequence      = () => {
  let array = []
  while( array.length < slots.length) {
    let x = randomNum(slots.length)
    if( NOT( array.includes(x) ) ) {
      array.push(x)
    }
  }
  return array
}
const sortBonusList       = () => {
  let number = randomNum(bonusList.length)
  while ( shorterThanBonusList(bonusUsed.length) ) {
    if( NOT( hasIndexInBonusUsed(number) ) ) {
      return number
    }
    number = randomNum(bonusList.length)
  }
  return ''
}

// BONUS
const getBonus      = () => {
  let someBonus = sortBonusList()
  if( NOT(someBonus) ) {
    return bonusList[someBonus]
  }
  return ''
}
const newBonus     = () => ( bonus = getBonus() )
const checkBonus   = (card) => {
  let currentBonus = useBonus(bonus)
  if(card === currentBonus.bonus) {
    incrementBonusPoint()
  }
  setBonus()
}
const applyBonus   = () => ( HTML('bonus-request').innerHTML = bonus.request )
const useBonus      = () => {
  if(bonus) {
    bonusUsed.push(bonus)
  }
  return bonus
}
const bonusWasUsed  = (bonus) => ( bonusUsed.includes(bonus) ? true : false )
const setBonus     = () => {
  newBonus()
  applyBonus()
}
// CARDS
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
  let positions = cards.map( card => slots.filter( slot => ( HTML(slot).className === card ) ) )
  return [ positions[0][0], positions[1][0] ]
}
const resumeCard      = (cards, slots) => ( slots.map( (slot, index) => HTML(slot).className = cards[index] ) )
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

// CHANCES
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
      time = setTimeout( ()=>{resumeCard(flippedCards, slots); success(); unlockAll(); clearTimeout(time)}, delayGamePlay )
    }else {
      lockAll()
      failCard(slots)
      time = setTimeout( ()=>{resumeCard(flippedCards, slots); fail(); unlockAll(); clearTimeout(time)}, delayGamePlay )
    }
  incrementAttempt()
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
  let sequenceOfCards = createSequence()
  let newOrder = sequenceOfCards.map( item => parseInt(item) )

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
    applyBonus()
    checkFlips()
    setBonus()
  }
}