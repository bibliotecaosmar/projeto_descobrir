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
  {'icon': 'linux-icon', 'bonus': 'É um OS OpenSorce', 'where': []},
  {'icon': 'google-icon', 'bonus': 'Google', 'where': []},
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
const removeSetdown = (icon) => ( icon.split('_')[1] )

const incrementChances	  = (icon) => { if(chances.includes(icon)){chances.push(icon)} }
const resetChances        = () => ( chances = [] )

/**
 *  Services(Business Rules)
 * ===================================================================== 
 */
// Generators
const createSequence = () => {
  array = []
  while( array.length < slotNumber) {
    let x = randomNum(slotNumber)
    if( NOT( array.includes(x) ) ) {
      array.push(x)
    }
  }
  return array
}

const updateSlotsContent = () => {
  content = []
  for(let i = 0; i < slotNumber; i++) {
    content.push(HTML(slots[i]).className)
  }
  slotsContent = content
}
// Bonus
const newBonus   = (newBonus) => ( bonus = newBonus )
const emptyBonus = () => ( bonus = {'has': false} )
const stackBonus = (bonus) => ( bonusStack.push(bonus) )
const drawBonus  = (bonus) => ( bonusStack.remove(bonus) )
const checkBonus = (icon1, icon2) => {
  if(bonus.icon = value) {
    incrementBonusPoint()
    newBonus = bonusStack.pop()
    newBonus.has ? newBonus() : emptyBonus()
  }
}
const upBonus    = () => {
  for(let i = 0; i < bonusList.length; i++) {
    if(hasTwoInArray(chances, bonusList[i].icon)) {
      stackBonus(bonusList[i])
    }
  }
}
const applyBonus = () => ( HTML('bonus-request').innerHTML = bonus.has ? bonus.bonus : '')
// Icons
const setIcons = (order) => {
  for(let i = 0; i < slotNumber; i++) {
    HTML((i+1), 'slot-').className = 'setdown_'+( icons[order[i]] )
  }
}
const setIconsNotLockeds = () => {
  for(let i = 0; i < slotNumber; i++) {
    icon = HTML(slots[i]).className
    if( NOT( icon.includes('setdown_') ||
             icon.includes('locked_') ) ) {
      HTML(slots[i]).className = addSetdown(icon)
    }
  }
}
const lockIcons = () => {
  for(let i = 0; i < slotNumber; i++) {
    icon = HTML( slots[i] ).className
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
    icon = HTML( slots[i] ).className
    if( NOT( icon.includes('setdown_') ||
             icon.includes('locked_') ) ) {
      flippedIcons.push( icon )
    }
  }
  // if(flippedIcons[0] == flippedIcons[1]) {
  //   checkBonus(flippedIcons[0])
  // }
  return true ? (flippedIcons[0] == flippedIcons[1]) : false
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
      time = setTimeout( ()=>{fail(); unlockAll(); clearTimeout(time)}, 1500 )
    }
  incrementAttempt()
  updateSlotsContent()
  checkEndGame()
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
   
    incrementChances(icon)
    
    if( icon.includes('setdown_') ) {
      HTML(slot, 'slot-').className = removeSetdown(icon)
      ++iconsFlippeds
      HTML('FlippedIcons').innerHTML = iconsFlippeds.toString()
    }
    checkFlips()
    //upBonus()
    //applyBonus()
  }
}