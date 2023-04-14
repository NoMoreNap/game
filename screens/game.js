import templateEngine from '../node_modules/tonyabayonetta/lib/scripts/templateEngine.js'

export default class Game  {
    constructor(element) {
        element.appendChild(templateEngine(Game.TEMPLATE()))
        localStorage.setItem('inGame', true)
    }
}

Game.TEMPLATE = () => {
    return {
        tag: 'div',
        cls: 'in-dev-block'
    }
}