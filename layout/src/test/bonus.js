const bonusList = [
    {bonus: 'google-card', request: 'Ferramenta de pesquisa'},
    {bonus: 'windows', request: 'Sistema operacional da microsoft'},
    {bonus: 'linux-card', request: 'Nome popular do sistema opensource com diversas distros'},
    {bonus: 'youtube-card', request: 'Site de postagem de vídeos'},
]

let bonus
let bonusUsed = []
let randomNums = [2, 3, 3, 1, 4, 4]
const randomNum = () => ( randomNums.pop() )
const youWin    = () => ( console.log("You Win!") )
const youLost   = () => ( console.log("You Lost!") )

const getBonus      = () => ( bonusList[randomNum()] )
const applyBonus    = (newBonus) => ( bonus = newBonus )
const useBonus      = (bonus) => {
    bonusUsed.push(bonus)
    bonus = null
}
const bonusWasUsed  = (bonus) => ( bonusUsed.includes(bonus) ? true : false )

const showBonus     = () => ( console.log(bonus['request']) )
const checkBonus    = (input) => {
    let currentBonus = bonus
    useBonus(bonus)
    setBonus()
    if(input === currentBonus['bonus']) {
        youWin()
        return
    }
    youLost()
}
const generateBonus = () => {
    
}