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
  
  while ( hasIndexInBonusUsed(number) ) {
    number = randomNum(bonusList.length)
  }
  return number
}

// BONUS
const requestBonus  = () => ( bonus ? bonus.request : '' )
const getBonus      = () => {
  if( NOT(reachDrawLimit()) ) {
    let someBonus = sortBonusList()
    if( NOT( someBonus === 'empty' ) ) {
      return bonusList[someBonus]
    }
  }
  return ''
}
const newBonus      = () => ( bonus = useBonus(getBonus()) )
const clearBonus    = () => ( bonus = null )
const checkBonus    = (card) => {
  let currentBonus = useBonus(bonus)
  if(card === currentBonus.bonus) {
    incrementBonusPoint()
  }
  setBonus()
}
const applyBonus    = () => ( HTML('bonus-request').innerHTML = requestBonus() )
const useBonus      = (bonusMarked) => {
  if(bonusMarked && NOT(bonusUsed.includes(bonusMarked)) ) {
    bonusUsed.push(bonusMarked)
  }
  return bonusMarked
}
const bonusWasUsed  = (bonus) => ( bonusUsed.includes(bonus) ? true : false )
const setBonus      = () => {
  clearBonus()
  if( isPair(attempts) ) {
    newBonus()
  }
  applyBonus()
}
const hastenBonus   = (card) =>  {
  if(bonusList.some( bonus => bonus.card === card )) {
    let newBonus = bonusList.filter( bonus => bonus.card === card)[0]
    bonus = useBonus(newBonus)
  }
}
// CARDS
const flipNumber      = () => {
  let flips = 0
  slots.map( slot => {
    if( noState(HTML(slot).className) ) {
      flips++
    }
  })
  return flips
}
const getFlippedCards = () => {
  let cards = []
  slots.map( slot => {
    if( noState(HTML(slot).className) ) {
      cards.push(HTML(slot).className)
    }
  })
  return cards
}
const getCard         = (cards) => {
  let positions = cards.map( card => slots.filter( slot => ( HTML(slot).className === card ) ) )
  return ( positions[0][0] === positions[1][0] ) ? [ positions[0][0], positions[0][1] ] : [ positions[0][0], positions[1][0] ]
}
const showAllCards    = () => ( slots.forEach( s => ( HTML(s).className = removeStates(HTML(s).className) ) ) )
const setAllCards     = () => ( slots.forEach( s => ( HTML(s).className = addSetdown(HTML(s).className ) ) ) )
const setCards        = (order) => ( slots.map( (slot, index) => HTML(slot).className = 'setdown_'+ cards[order[index]] ) )

const lockCards       = () => {
  slots.map(slot => {
    if(noState(HTML(slot).className)) {
      HTML(slot).className = addLocked(HTML(slot).className)
    }
  })
}
const setCardsNotLockeds  = () => {
  slots.map(slot => {
    if( noState( HTML(slot).className ) ) {
      HTML(slot).className = addSetdown(HTML(slot).className)
    }
  })
}

// CHANCES
const showAttempts      = () => ( HTML('attempts').innerHTML = attempts )
const incrementAttempts = () => ( attempts = attempts+1 )
const clearAttempts     = () => ( attempts = 0 )
const showAll           = () => {
  showAllCards()
  time = setTimeout( ()=>{setAllCards(); unlockAll();  setBonus(); clearTimeout(time)}, delayStartGame )
}
const success 	        = () => {
  lockCards()
  addPoints()  
}
const fail 		          = () => {
  deductPoints()
  resetChance()
}
const resetChance       = () => {
  setCardsNotLockeds()
}
const checkFlips        = () => {
  if( flipNumber() === 2 ) {
    let flippedCards = getFlippedCards()
    let slots        = getCard(flippedCards)
    
    if( flippedCards[0] == flippedCards[1] ) {
      lockAll()
      checkBonus(flippedCards[0])
      console.log(slots)
      blinkIn(slots, 'success-card')
      time = setTimeout( ()=>{turnOffBlink(); success(); unlockAll(); clearTimeout(time)}, delayGamePlay )
    }else {
      lockAll()
      blinkIn(slots, 'fail-card')
      time = setTimeout( ()=>{turnOffBlink(); fail(); unlockAll(); clearTimeout(time)}, delayGamePlay )
    }
  incrementAttempts()
  showAttempts()
  checkEndGame()
  setBonus()
  }
}
const checkEndGame      = () => {
  if(slotsContent.every((a) => a.includes('locked_'))) {
    resetGame()
  }
}
const resetGame         = () => {
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
}

function flip(slot) {
  if(permission) {
    let card = HTML(slot, 'slot-').className
   
    if( card.includes('setdown_') ) {
      let upsetCard = removeStates(card)
      HTML(slot, 'slot-').className = upsetCard
      hastenBonus(upsetCard)
    }
    applyBonus()
    checkFlips()
  }
}