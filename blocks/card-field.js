import templateEngine from '../node_modules/tonyabayonetta/lib/scripts/templateEngine.js';

export default class CardField {
    constructor(element) {
        this.element = element;
        this.element.appendChild(templateEngine(CardField.TEMPLATE_FIELD()));
        this.field = document.querySelector('.game-field');

        this.level = localStorage.getItem('complexity') * 6;
        while (this.level) {
            this.field.appendChild(templateEngine(CardField.TEMPLATE_CARD()));
            this.level--;
        }
        this.onFieldClick = this.onFieldClick.bind(this);
        this.field.addEventListener('click', this.onFieldClick);
    }

    onFieldClick(e) {
        const target = e.target;
        if (target.classList.contains('game-card')) {
            this.toFace(target);
            setTimeout(() => {
                target.classList.add('flip-scale-up-hor');
            }, 300);
            const promise = new Promise(function (r, s) {
                setTimeout(() => {
                    target.classList.remove('flip-scale-up-hor');
                    r('success');
                }, 2000);
            });
        }
    }
    toFace(target) {
        const card = document.createElement('img');
        card.classList.add('game-card_f');
        card.setAttribute('src', 'src/cards/face/as.svg');
        target.appendChild(card);
    }
}

CardField.TEMPLATE_FIELD = () => {
    return {
        attr: {},
        cls: ['game-wrapper'],
        tag: 'div',
        content: {
            tag: 'div',
            cls: 'game-field',
        },
    };
};

CardField.TEMPLATE_CARD = () => {
    return {
        attr: {},
        cls: ['game-card'],
        tag: 'div',
        content: [
            {
                attr: {
                    src: 'src/cards/shirt.svg',
                    alt: '',
                    srcset: '',
                },
                cls: ['game-card_s'],
                tag: 'img',
                content: '',
            },
        ],
    };
};
