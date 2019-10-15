/**
 * =======================================
 *  System Variable
 * =======================================
 */
var permission = true

/**
 * =======================================
 *  Utilities
 * =======================================
 */
function removeSetdown(card) {
  return card.split('_')[1]
} // check

function addSetdown(card) {
  return ['setdown_', card].join('')
} // check

function addLocked(card) {
  return ['locked_', card].join('')
} // check

function lockAll() {
  permission = false
} // check

function unlockAll() {
  permission = true
} // check

/**
 * =======================================
 *  Main Functions
 * =======================================
 */
function sequencialIntNoRepeated(rang, arr = []) {
  x = Math.floor(Math.random() * 10).toString()
  if(arr.indexOf(x) == -1 && x < rang) {
    arr.push(x)
  }
  if(arr.length < rang) {
    return sequencialIntNoRepeated(rang, arr)
  }
  return arr
} // check

function setCards(a) {
  for(let i = 0; i < a.length; i++) {
    document.getElementById('item-'+(i+1)).className = 'setdown_'+a[i]
  }
} // check

function success() {
  addPoints()
  lockCards()
} // check

function fail() {
  deductPoints()
  resetChance()
} // check

function checkFlips() {
  if(document.getElementById('FlippedCards').innerHTML == 2) {
    if(comparator()) {
      success()
    }else {
      lockAll()
      time = setTimeout(function(){fail(); unlockAll(); clearTimeout(time)}, 2000)
    }
  }
} //check

function comparator() {
  let cards = []
  for(let i = 0; i < 6; i++) {
    card = document.getElementById('item-'+(i+1)).className
    if(card.indexOf('setdown_') == -1 && card.indexOf('locked_') == -1) {
      cards.push(card)
    }
  }
  if(cards[0] == cards[1]) {
    return true
  }
  return false
} // check

function lockCards() {
  for(let i = 0; i < 6; i++) {
    card = document.getElementById('item-'+(i+1)).className
    if(card.indexOf('setdown_') == -1 && card.indexOf('locked_') == -1) {
      document.getElementById('item-'+(i+1)).className = addLocked(card)
    }
  }
  document.getElementById('FlippedCards').innerHTML = "0"
} // check

function setCardsNotLockeds() {
  for(let i = 0; i < 6; i++) {
    card = document.getElementById('item-'+(i+1)).className
    if(card.indexOf('setdown_') == -1 && card.indexOf('locked_') == -1) {
      document.getElementById('item-'+(i+1)).className = addSetdown(card)
    }
  }
} // check

function resetChance() {
  setCardsNotLockeds()
  document.getElementById('FlippedCards').innerHTML = "0"
} // check

function addPoints() {
  currentPoints = parseInt(document.getElementById('Points').innerHTML)
  document.getElementById('Points').innerHTML = currentPoints + 2
} // check

function deductPoints() {
  currentPoints = parseInt(document.getElementById('Points').innerHTML)
  document.getElementById('Points').innerHTML = currentPoints - 2
} // check


/**
 * =======================================
 *  Features
 * =======================================
 */
function shuffle() {
  let cards = ['saber', 'archer', 'lancer', 'saber', 'archer', 'lancer']
  let x = []
  let sequence = sequencialIntNoRepeated(6)

  for(let i = 0; i < cards.length; i++) {
    x[i] = cards[parseInt(sequence[i])]
  }
  
  setCards(x)
  document.getElementById('Screen').setdown = false
  document.getElementById('start').innerHTML = "Shuffle"
} //check

function flip(card_num, permission) {
  if(permission) {
    card = document.getElementById('item-'+card_num).className
    cardsFlippeds = parseInt(document.getElementById('FlippedCards').innerHTML)
  
    if(card.indexOf('setdown_') != -1) {
      document.getElementById("item-"+card_num).className = removeSetdown(card)
      ++cardsFlippeds
      document.getElementById('FlippedCards').innerHTML = cardsFlippeds.toString()
    }
    checkFlips()
  }
} //check