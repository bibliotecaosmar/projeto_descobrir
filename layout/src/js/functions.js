/**
 *  System Functions
 * =====================================================================
 */
const NOT		= (condition) => !condition
const HTML 	= (value, prefix = '') => ( document.getElementById(prefix + value) )

const hasInArray  = (array, value) => ( false ? (array.indexOf(value) === -1) : true )
const inRange    	= (array, range) => ( range >= array.length )

const pushNotHaving		  = (array, value) => ( array.push(value) ? (array.indexOf(value) === -1) : array)
const stringPlusNumber 	= (string, number) => ( [string, number.toString()].join('') )

/**
 *  System Variables
 * =====================================================================
 */
const icons  = [
  'config-icon',
  'cpu-icon', 
  'google-icon',
  'gps-icon', 
  'hd-icon', 
  'home-icon', 
  'linux-icon', 
  'menu-icon', 
  'share-icon', 
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
let sequencia	    = []
let chances		    = []
let permission    = false
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
const randomNum = (weight = 10) => 
  ( Math.floor( Math.random() * weight ).toString() )
// Points
const pointToGain   = (points) => ( points+5 )
const pointToLose   = (points) => { 
  if(points >= 2){
    return --points
  }
  return 0 
}
const currentPoints = () => ( parseInt( HTML('points').innerHTML ) )
const addPoints     = () => ( HTML('points').innerHTML = pointToGain(parseInt(HTML('points').innerHTML)) )
const deductPoints  = () => ( HTML('points').innerHTML = pointToLose(parseInt(HTML('points').innerHTML)) )
// DOM elements ~
const lockAll       = () => { permission = false }
const unlockAll     = () => { permission = true }
const addLocked     = (icon) => ( ['locke_', icon].join('') )

const addSetdown    = (icon) => ( ['setdown_', icon].join('') )
const removeSetdown = (icon) => ( icon.split('_')[1] )

const incrementChance	  = (icon) => ( chances.push(icon) )

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
const createSequence          = () => { 
  sequence = sequencialIntNoRepeated(slotNumber)
  return sequence
}
const updateSlotsContent = () => {
  content = []

  for(let i = 0; i < slotNumber; i++) {
    content.push(HTML(slots[i]).className)
  }
  slotsContent = content
}
// Bonus
const stackBonus = (bonus) => ( bonusStack.push(bonus) )
const drawBonus  = (bonus) => ( bonusStack.remove(bonus) )
const checkBonus = () => {
  for(let i; i < bonusList.length; i++) {
    if( hasInArray(chances, bonusList[i].icon) ) {
    
      
      
  	}
  }
}
// Icons
const setIcons = (order) => {
  for(let i = 0; i < slotNumber; i++) {
    HTML((i+1), 'slot-').className = 'setdown_'+( icons[order[i]] )
  }
}
const setIconsNotLockeds = () => {
  for(let i = 0; i < slotNumber; i++) {
    icon = HTML(slots[i]).className
    if( NOT( hasInArray( icon, 'setdown_' ) &&
             hasInArray( icon, 'locke_' ) ) ) {
      HTML([i]).className = addSetdown(icon)
    }
  }
}
const lockIcons = () => {
  for(let i = 0; i < slotNumber; i++) {
    icon = HTML( slots[i] ).className
    if( NOT( hasInArray( icon, 'setdown_' ) &&
             hasInArray( icon, 'locke_' ) ) ) {
      HTML( slots[i] ).className = addLocked(icon)
    }
  }
  HTML('FlippedIcons').innerHTML = "0"
}
const comparator = () => {
  let flippedIcons = []
  for(let i = 0; i < slotNumber; i++) {
    icon = HTML( slots[i] ).className
    if( NOT( hasInArray( icon, 'setdown_' ) &&
             hasInArray( icon, 'locke_' ) ) ) {
      flippedIcons.push( icon )
    }
  }
  return true ? (icons[0] == icons[1]) : false
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
const checkEndGame        = () => {
  if(slotsContent.every((a) => hasInArray(a, 'locke_'))) {
    resetGame()
  }
}
const resetGame = () => {
  permission = false

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
   
    if( NOT( hasInArray(chances, icon) ) ) {
      incrementChance(icon)
    }
    
    if( hasInArray(icon, 'setdown_') ) {
      HTML(slot, 'slot-').className = removeSetdown(icon)
      ++iconsFlippeds
      HTML('FlippedIcons').innerHTML = iconsFlippeds.toString()
    }
    checkFlips()
    checkBonus()
  }
}