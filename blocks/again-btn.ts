import templateEngine from '../node_modules/tonyabayonetta/lib/scripts/templateEngine';


export default class AgainBtn {
    element: Element;
    static TEMPLATE: () => object;
    constructor(element: Element) {
        this.element = element;
        this.element.appendChild(templateEngine(AgainBtn.TEMPLATE()));
        document.querySelectorAll('.game-btn')!.forEach((el: any) => {
            el.addEventListener('click', () => {
                localStorage.clear();
                location.reload()
            })
        })
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
