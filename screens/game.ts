import templateEngine from '../node_modules/tonyabayonetta/lib/scripts/templateEngine';

export default class Game {
    element: HTMLElement;
    header: HTMLElement;
    static TEMPLATE: () => object;
    constructor(element: Element) {
        element.appendChild(templateEngine(Game.TEMPLATE()));

        this.element = document.querySelector('.game')!;

        localStorage.setItem('inGame', 'true');
        const $app = window.application;

        this.header = document.querySelector('.game-header')!;
        $app.renderBlock(this.header, 'timer');
        $app.renderBlock(this.header, 'btn');
        $app.renderBlock(this.element, 'card-field');
    }
}

Game.TEMPLATE = () => {
    return {
        attr: {},
        cls: ['game'],
        tag: 'section',
        content: [
            {
                attr: {},
                cls: ['game-header'],
                tag: 'div',
            },
        ],
    };
};
