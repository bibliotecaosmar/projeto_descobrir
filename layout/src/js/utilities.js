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
const isPair            = (number)  =>  ( ( (number % 2) === 0 ) ? true : false )

/**
 *  Subprocess Functions
 * =====================================================================
 */

// GAMEPLAY
const lockAll       = () => { permission = false }
const unlockAll     = () => { permission = true }

 // ARRAYS
const reachDrawLimit      = () => ( bonusUsed.length === bonusList.length )
const hasIndexInBonusUsed = (number) => ( ( bonusUsed.some(b => b.card === bonusList[number].card ) ) ? true : false )

// MATHEMATICAL
const randomNum = (size) => ( Math.floor( Math.random() * size ) )

// POINTS
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

// DOM ELEMENTS
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
const resumeCard    = (slots) => ( slots.map( slot => HTML(slot).className = ( HTML(slot).className ).split(' ')[0] ) )

// BLINK EFFECT
const blinkIn       = (slots, what) => {
  blinkSlots = slots
  turnOnBlink(what)
}
const whatBlink     = (slots) => ( blinkSlots = slots )
const turnOnBlink   = (resultCard) => {
  blink = setInterval(() => {
    if( NOT( HTML(blinkSlots[0]).className.includes(' ') ) ) {
      blinkSlots.map(slot => HTML(slot).className = HTML(slot).className+' '+resultCard)
      return
    }
    blinkSlots.map( slot => HTML(slot).className = ( HTML(slot).className ).split(' ')[0] )
  }, blinkTimeInterval)
}
const turnOffBlink  = () => {
  clearTimeout(blink)
  console.log(blinkSlots[0].includes(' '))
  if( HTML(blinkSlots[0]).className.includes(' ') ) {
    resumeCard(blinkSlots)
  }
}