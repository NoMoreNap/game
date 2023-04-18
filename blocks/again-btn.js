import templateEngine from '../node_modules/tonyabayonetta/lib/scripts/templateEngine.js';

export default class AgainBtn {
    constructor(element) {
        this.element = element;
        this.element.appendChild(templateEngine(AgainBtn.TEMPLATE()));
    }
}

AgainBtn.TEMPLATE = () => {
    return {
        attr: {},
        cls: ['game-btn'],
        tag: 'button',
        content: 'Начать заново',
    };
};
