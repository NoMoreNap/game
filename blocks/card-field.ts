import templateEngine from '../node_modules/tonyabayonetta/lib/scripts/templateEngine';

export default class CardField {
    element: Element;
    field: Element;
    level: number;
    cards: Array<object>;
    turns: number;
    currentPair: Array<string>;
    currentDivPair: Array<Element>;
    localPairs: Array<Number>;
    static TEMPLATE_FIELD: () => object;
    static CARDS_ARR: object;
    static TEMPLATE_CARD: () => object;
    static RANDOMIZER: (obj: object, count: number) => Array<object>;
    static MIXER: (obj: Array<object>) => Array<object>;

    constructor(element: Element) {
        this.element = element;
        this.element.appendChild(templateEngine(CardField.TEMPLATE_FIELD()));
        this.field = document.querySelector('.game-field')!;

        this.level = Number(localStorage.getItem('complexity')) * 6;
        this.cards = CardField.RANDOMIZER(CardField.CARDS_ARR, this.level);
        this.turns = 0;
        this.currentPair = [];
        this.currentDivPair = [];

        if (!localStorage.getItem('localPairs')) {
            this.localPairs = [];
        } else {
            this.localPairs = JSON.parse(localStorage.getItem('localPairs')!);
        }

        while (this.level) {
            this.field.appendChild(templateEngine(CardField.TEMPLATE_CARD()));
            this.level--;
        }

        this.onFieldClick = this.onFieldClick.bind(this);
        this.showAll = this.showAll.bind(this);

        if (!localStorage.getItem('inCurrentGame')) {
            this.showAll();
        } else {
            this.field.addEventListener('click', this.onFieldClick);
            this.turns = JSON.parse(localStorage.getItem('turns')!);
            this.cards = JSON.parse(localStorage.getItem('cards')!);
        }

        this.localPairs.forEach((el: any) => {
            const currentCard = document.querySelectorAll('.game-card')[el];
            const value = Object.values(this.cards[el])[0];
            this.toFace(currentCard, value);
            currentCard.classList.add('flip-scale-up-hor', 'pair');
        });
        if (localStorage.getItem('openCard')) {
            const index = Number(localStorage.getItem('openCard'));
            const card = document.querySelectorAll('.game-card')[index];
            const value = Object.values(this.cards[index])[0];
            const cardName = Object.keys(this.cards[index])[0];
            this.currentDivPair.push(card);
            this.currentPair.push(cardName);

            this.toFace(card, value);
            card.classList.add('flip-scale-up-hor');
        }
    }

    showAll() {
        this.cards = CardField.MIXER(this.cards);
        localStorage.setItem('inCurrentGame', 'true');
        localStorage.setItem('turns', JSON.stringify(this.turns));
        localStorage.setItem('cards', JSON.stringify(this.cards));
        for (let i = 0; i < this.cards.length; i++) {
            const value = Object.values(this.cards[i])[0];
            this.field.children[i].classList.add('flip-scale-up-hor');
            this.toFace(this.field.children[i], value);
        }
        setTimeout(() => {
            for (let i = 0; i < this.cards.length; i++) {
                this.field.children[i].classList!.remove('flip-scale-up-hor');
                this.field.children[i].lastElementChild!.remove();
            }
            this.field.addEventListener('click', this.onFieldClick);
        }, 5000);
    }

    onFieldClick(e: any) {
        const target = e.target;
        const childArr = this.field.children;
        this.turns++;
        localStorage.setItem('turns', String(this.turns));
        if (target.classList.contains('pair')) {
            return window.application.alert('Вы уже выбирали эту карту', 500);
        }
        if (target.classList.contains('game-card')) {
            target.classList.add('open');
            for (let i = 0; i < childArr.length; i++) {
                const shirt = childArr[i];
                const cardName = Object.keys(this.cards[i])[0];
                const face = this.cards[i][cardName as keyof object];
                if (target === shirt) {
                    localStorage.setItem('openCard', String(i));
                    this.currentDivPair.push(target);
                    this.currentPair.push(cardName);
                    this.toFace(shirt, face);
                    target.classList.add('flip-scale-up-hor');
                    if (this.turns === 2) {
                        return this.checkWin(this.currentPair, this.currentDivPair);
                    }
                }
            }
        }
    }

    toFace(target: Element, src: string) {
        const card = document.createElement('img');
        card.classList.add('game-card_f');
        card.setAttribute('src', src);
        target.appendChild(card);
    }

    checkWin(pair: Array<string>, currentDivPair: Array<Element>) {
        if (Number(this.field.children.length) - 2 === document.querySelectorAll('.pair').length) {
            window.application.stopTimer();
            return window.application.renderBlock(document.querySelector('.app')!, 'win');
        }
        let win = false;
        pair[0] === pair[1] ? (win = true) : (win = false);
        if (win) {
            currentDivPair.forEach((el) => {
                for (let i = 0; i < this.field.children.length; i++) {
                    const element = this.field.children[i];
                    if (el === element) {
                        this.localPairs.push(i);
                    }
                }
                el.classList.add('pair');
            });
            window.application.alert('Вы собрали пару!', 1000);
            localStorage.setItem('localPairs', JSON.stringify(this.localPairs));
        } else {
            window.application.stopTimer();
            window.application.renderBlock(document.querySelector('.app')!, 'lose');
            localStorage.clear();
        }
        localStorage.setItem('openCard', '');
        this.turns = 0;
        localStorage.setItem('turns', '0');
        this.currentDivPair = [];
        this.currentPair = [];
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

CardField.CARDS_ARR = {
    A: {
        s: '../src/cards/face/As.svg',
        h: '../src/cards/face/Ah.svg',
        d: '../src/cards/face/Ad.svg',
        c: '../src/cards/face/Ac.svg',
    },
    K: {
        s: '../src/cards/face/Ks.svg',
        h: '../src/cards/face/Kh.svg',
        d: '../src/cards/face/Kd.svg',
        c: '../src/cards/face/Kc.svg',
    },
    Q: {
        s: '../src/cards/face/Qs.svg',
        h: '../src/cards/face/Qh.svg',
        d: '../src/cards/face/Qd.svg',
        c: '../src/cards/face/Qc.svg',
    },
    J: {
        s: '../src/cards/face/Js.svg',
        h: '../src/cards/face/Jh.svg',
        d: '../src/cards/face/Jd.svg',
        c: '../src/cards/face/Jc.svg',
    },
    ten: {
        s: '../src/cards/face/10s.svg',
        h: '../src/cards/face/10h.svg',
        d: '../src/cards/face/10d.svg',
        c: '../src/cards/face/10c.svg',
    },
    nine: {
        s: '../src/cards/face/9s.svg',
        h: '../src/cards/face/9h.svg',
        d: '../src/cards/face/9d.svg',
        c: '../src/cards/face/9c.svg',
    },
    eight: {
        s: '../src/cards/face/8s.svg',
        h: '../src/cards/face/8h.svg',
        d: '../src/cards/face/8d.svg',
        c: '../src/cards/face/8c.svg',
    },
    seven: {
        s: '../src/cards/face/7s.svg',
        h: '../src/cards/face/7h.svg',
        d: '../src/cards/face/7d.svg',
        c: '../src/cards/face/7c.svg',
    },
    six: {
        s: '../src/cards/face/6s.svg',
        h: '../src/cards/face/6h.svg',
        d: '../src/cards/face/6d.svg',
        c: '../src/cards/face/6c.svg',
    },
};

CardField.RANDOMIZER = (obj, c) => {
    const mixed: object[] = [];
    const randKeys = [];
    const keys = Object.keys(obj);
    let randValues: string[] = [];
    let pairs = c / 2;
    while (pairs) {
        const name = keys[(keys.length * Math.random()) << 0];
        if (randKeys.indexOf(name) === -1) {
            randKeys.push(name);
            pairs--;
        }
        continue;
    }
    randKeys.forEach((card) => {
        const keysV = Object.keys(obj[card as keyof object]);
        let i = 2;
        while (i) {
            const name = keysV[(keysV.length * Math.random()) << 0];
            if (randValues.indexOf(name) === -1) {
                randValues.push(name);
                i--;
            }
            continue;
        }
        randValues.forEach((val) => {
            mixed.push({
                [card]: obj[card as keyof object][val],
            });
        });
        randValues = [];
    });
    return mixed;
};

CardField.MIXER = (obj) => {
    for (let i = obj.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [obj[i], obj[j]] = [obj[j], obj[i]];
    }
    return obj;
};
