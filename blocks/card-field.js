import templateEngine from '../node_modules/tonyabayonetta/lib/scripts/templateEngine';

export default class CardField {
    constructor(element) {
        this.element = element;
        this.element.appendChild(templateEngine(CardField.TEMPLATE_FIELD()));
        this.field = document.querySelector('.game-field');

        this.level = localStorage.getItem('complexity') * 6;
        this.cards = CardField.RANDOMIZER(CardField.CARDS_ARR, this.level);
        this.turns = 0;
        this.currentPair = [];
        this.currentDivPair = [];
        while (this.level) {
            this.field.appendChild(templateEngine(CardField.TEMPLATE_CARD()));
            this.level--;
        }

        this.showAll();
        this.onFieldClick = this.onFieldClick.bind(this);
        this.showAll = this.showAll.bind(this);
        this.checkEndGame = this.checkEndGame.bind(this);
    }

    showAll() {
        this.cards = CardField.MIXER(this.cards);
        for (let i = 0; i < this.cards.length; i++) {
            const value = Object.values(this.cards[i])[0];
            this.field.children[i].classList.add('flip-scale-up-hor');
            this.toFace(this.field.children[i], value);
        }
        setTimeout(() => {
            for (let i = 0; i < this.cards.length; i++) {
                this.field.children[i].classList.remove('flip-scale-up-hor');
                this.field.children[i].lastElementChild.remove();
            }
            this.field.addEventListener('click', this.onFieldClick);
        }, 5000);
    }

    onFieldClick(e) {
        const target = e.target;
        const childArr = this.field.children;
        this.turns++;
        if (target.classList.contains('pair')) {
            return window.application.alert('Вы уже выбирали эту карту', 500);
        }
        if (target.classList.contains('game-card')) {
            for (let i = 0; i < childArr.length; i++) {
                const shirt = childArr[i];
                const cardName = Object.keys(this.cards[i])[0];
                const face = this.cards[i][cardName];
                if (target === shirt) {
                    this.currentDivPair.push(target);
                    this.currentPair.push(cardName);
                    this.toFace(shirt, face);
                    target.classList.add('flip-scale-up-hor');
                    if (this.turns === 2) {
                        return this.checkWin(
                            this.currentPair,
                            this.currentDivPair
                        );
                    }
                }
            }
        }
    }

    toFace(target, src) {
        const card = document.createElement('img');
        card.classList.add('game-card_f');
        card.setAttribute('src', src);
        target.appendChild(card);
    }

    checkWin(pair, currentDivPair) {
        let win = false;
        pair[0] === pair[1] ? (win = true) : (win = false);
        if (win) {
            currentDivPair.forEach((el) => {
                el.classList.add('pair');
            });
            window.application.alert('Вы собрали пару!', 1000);
        } else {
            currentDivPair.forEach((el) => {
                setTimeout(() => {
                    el.classList.remove('flip-scale-up-hor');
                    el.lastElementChild.remove();
                }, 600);
            });
            window.application.alert('Не правильно!', 1000);
        }
        this.checkEndGame();
        this.turns = 0;
        this.currentDivPair = [];
        this.currentPair = [];
    }

    checkEndGame() {
        const childArr = this.field.children;
        let win = true;
        for (const el of childArr) {
            if (!el.classList.contains('pair')) {
                win = false;
            }
        }
        if (win) {
            setTimeout(() => {
                window.application.alert('Ура вы победили!', 3000);
            }, 1000);
            setTimeout(() => {
                localStorage.removeItem('inGame');
                localStorage.removeItem('сomplexity');
                location.reload();
            }, 3600);
        }
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
    const mixed = [];
    const randKeys = [];
    const keys = Object.keys(obj);
    let randValues = [];
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
        const keysV = Object.keys(obj[card]);
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
                [card]: obj[card][val],
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
