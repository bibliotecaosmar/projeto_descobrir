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
const delayGamePlay = 500
const icons  = [
  'config-icon',
  'config-icon',
  'cpu-icon',
  'cpu-icon',
  'google-icon',
  'google-icon',
  'gps-icon',
  'gps-icon',
  'hd-icon',
  'hd-icon',
  'home-icon',
  'home-icon',
  'linux-icon',
  'linux-icon',
  'menu-icon',
  'menu-icon',
  'share-icon',
  'share-icon',
  'windows-icon',
  'windows-icon',
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
  'slot-17',
  'slot-18',
  'slot-19',
  'slot-20',
]
const iconNumber = icons.length
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
  {'icon': 'linux-icon', 'request': 'É um OS OpenSorce'},
  {'icon': 'google-icon', 'request': 'Ferramenta de pesquisar'},
  {'icon': 'cpu-icon', 'request': 'É o núcleo do computador'},
  {'icon': 'gps-icon', 'request': 'Usado para se localizar'}
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

const addLocked     = (icon) => ( ['locked_', icon].join('') )
const addSetdown    = (icon) => ( ['setdown_', icon].join('') )
const removeStates  = (icon) => {
  if( icon.includes('setdown_') || icon.includes('locked_') ) {
    return icon.split('_')[1]
  }
  return icon
}
const returnIcons   = (chanceSlots) => ( chanceSlots.map(c => ( HTML(c).className ) ) )
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
const createSequence = () => {
  let array = []
  while( array.length < slotNumber) {
    let x = randomNum(slotNumber)
    if( NOT( array.includes(x) ) ) {
      array.push(x)
    }
  }
  return array
}
const updateSlotsContent = () => {
  let content = []
  for(let i = 0; i < slotNumber; i++) {
    content.push(HTML(slots[i]).className)
  }
  slotsContent = content
}
// Bonus
const newBonus   = (newBonus) => ( bonus = newBonus )
const emptyBonus = () => ( bonus = {'has': false} )
const stackBonus = (bonusFound) => {
  if( NOT( bonusStack.some(b => b.icon === bonusFound.icon ) ) ) {
    bonusStack.push(bonusFound)
  }
}
const drawBonus  = (bonusMatch) => ( bonusStack.remove(bonusMatch) )
const setBonus   = () => {
  if( NOT( bonus.has || bonusStack.length === 0 ) ) {
    newBonus(bonusStack.pop())
    applyBonus()
  }
}
const checkBonus = (icon) => {
  if( NOT( bonus.icon != icon ) || bonusStack.length === 0 ) {
    incrementBonusPoint()
    newBonus(bonusStack.pop())
  }
  if( bonusStack.length === 0 ) {
    emptyBonus()
  }
}
const upBonus    = () => {
  let chancesStateless = returnIcons(chances).map(removeStates)
  bonusList.forEach(bonusItem => {
    let stack = {'icon': bonusItem.icon, 'request': bonusItem.request, 'has': true}
    if( NOT( hasTwoInArray(chancesStateless, bonusItem.icon) ) ||
        bonusStack.includes(stack) ) {
      return
    }
    stackBonus(stack)
  })
}
const applyBonus = () => ( HTML('bonus-request').innerHTML = bonus.has ? bonus.request : '' )
// Icons
const setIcons = (order) => {
  for(let i = 0; i < slotNumber; i++) {
    HTML((i+1), 'slot-').className = 'setdown_'+( icons[order[i]] )
  }
}
const setIconsNotLockeds = () => {
  for(let i = 0; i < slotNumber; i++) {
    let icon = HTML(slots[i]).className
    if( NOT( icon.includes('setdown_') ||
             icon.includes('locked_') ) ) {
      HTML(slots[i]).className = addSetdown(icon)
    }
  }
}
const lockIcons = () => {
  for(let i = 0; i < slotNumber; i++) {
    let icon = HTML( slots[i] ).className
    if( NOT( icon.includes('setdown_') ||
             icon.includes('locked_') ) ) {
      HTML( slots[i] ).className = addLocked(icon)
    }
  }
  HTML('FlippedIcons').innerHTML = "0"
}
const comparator = () => {
  let flippedIcons = []
  for(let i = 0; i < slotNumber; i++) {
    let icon = HTML( slots[i] ).className
    if( NOT( icon.includes('setdown_') ||
             icon.includes('locked_') ) ) {
      flippedIcons.push(icon)
    }
  }
  if(flippedIcons[0] == flippedIcons[1]) {
    checkBonus(flippedIcons[0])
    return true
  }
  return false
}
// Chances
const incrementAttempt    = () => ( HTML('attempt').innerHTML = parseInt(HTML('attempt').innerHTML)+1 )
const success 	          = () => {
  addPoints()
  lockIcons()
}
const fail 		            = () => {
  deductPoints()
  resetChance()
}
const resetChance         = () => {
  setIconsNotLockeds()
  HTML('FlippedIcons').innerHTML = "0"
}
const checkFlips          = () => {
  if( HTML('FlippedIcons').innerHTML == 2 ) {
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
const checkEndGame  = () => {
  if(slotsContent.every((a) => a.includes('locked_'))) {
    resetGame()
  }
}
const resetGame     = () => {
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

  setIcons(newOrder)
  HTML('main-button').style.display = "none"
}

function flip(slot) {
  if(permission) {
    icon = HTML(slot, 'slot-').className
    iconsFlippeds = parseInt(HTML('FlippedIcons').innerHTML)
   
    if( icon.includes('setdown_') ) {
      HTML(slot, 'slot-').className = removeStates(icon)
      ++iconsFlippeds
      HTML('FlippedIcons').innerHTML = iconsFlippeds.toString()
    }

    incrementChances(stringPlusNumber('slot-', slot))
    checkFlips()
    upBonus()
    applyBonus()
  }
}