const slots         = ['gooogle-card', 'windows-card', 'google-card', 'pierre-card', 'joker-card']
const equalCards    = ['google-card', 'google-card']
const inequalCards  = ['windows-card', 'google-card']

const getCards = (cards) => {
    let positions   = cards.map(card => slots.filter( slot => slot === card ) )
    return [ positions[0][0], positions[1][0] ]
    /**
     * 
     * Adapted code to testes(no use HTML method system)
     * 
     */
}