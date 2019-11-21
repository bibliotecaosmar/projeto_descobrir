/**
 *  System Variables
 * =====================================================================
 */

//---------__TIME__---------//
const delayGamePlay  = 2000
const delayStartGame = 4000
const blinkTimeInterval = 250

//--------__CARDS__---------//
const cardsForStage  = [
  [
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
  ],
]
const slots      = [
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

//---------__HUB__----------//
let stage        = 1
let points       = 0
let attempts     = 0
let flippedCards = 0

//---------__BONUS__---------//
const bonusList  = [
  {card: 'card-chrome', request: 'Navegador(Browser) de internet'},
  {card: 'card-windows', request: 'Sistema operacional da microsoft'},
  {card: 'card-linux', request: 'É um sistema operacional opensorce'}
]
let bonus
let bonusUsed    = []

//--------__NUMBERS__--------//
let sequence	   = []

//------__PERMISSION__------//
let permission   = false

//--------__OTHERS__--------//
let blink
let blinkSlots