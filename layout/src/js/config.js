/**
 *  System Variables
 * =====================================================================
 */

//---------__TIME__---------//
const delayGamePlay  = 1500
const delayStartGame = 2000

//--------__CARDS__---------//
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

//---------__BONUS__---------//
const bonusList      = [
  {card: 'card-chrome', request: 'Navegador(Browser) de internet'},
  {card: 'card-windows', request: 'Sistema operacional da microsoft'},
  {card: 'card-linux', request: 'Conhecido popularmente como um sistema operacional opensource'}
]
let bonus
let bonusUsed     = []

//---------__NUMBERS__---------//
let sequence	    = []

//---------__PERMISSION__---------//
let permission    = false
