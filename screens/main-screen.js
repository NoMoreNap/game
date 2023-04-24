import templateEngine from '../node_modules/tonyabayonetta/lib/scripts/templateEngine';

export default class MainScreen {
    constructor(element) {
        this.element = element;
        this.element.appendChild(templateEngine(MainScreen.TEMPLATE()));

        document
            .querySelector('.complexity-levels')
            .addEventListener('click', this.clickOnLevel);
        document
            .querySelector('.complexity-btn')
            .addEventListener('click', this.startClick);
        this.app = window.application;
        this.startClick = this.startClick.bind(this);
        this.clickOnLevel = this.clickOnLevel.bind(this);
    }

    clickOnLevel(e) {
        const target = e.target;
        const levels = document.querySelectorAll('.complexity-levels__item');

        levels.forEach((level) => {
            level.classList.remove('active');
        });
        target.classList.add('active');
        localStorage.setItem('complexity', target.dataset.level);
    }

    startClick() {
        const levels = document.querySelectorAll('.complexity-levels__item');
        let isActive = false;
        levels.forEach((level) => {
            if (level.classList.contains('active')) {
                isActive = true;
            }
        });
        if (!isActive) {
            return window.application.alert(
                'Выберите уровень сложности!',
                1000
            );
        }
        window.application.renderScreen('game');
    }
}

MainScreen.TEMPLATE = () => {
    return {
        tag: 'section',
        cls: 'complexity',
        content: [
            {
                tag: 'h1',
                cls: 'complexity-title',
                content: 'Выбери сложность',
            },
            {
                tag: 'div',
                cls: 'complexity-levels',
                content: [
                    {
                        tag: 'button',
                        cls: 'complexity-levels__item',
                        attr: {
                            'data-level': '1',
                        },
                        content: '1',
                    },
                    {
                        tag: 'button',
                        cls: 'complexity-levels__item',
                        attr: {
                            'data-level': '2',
                        },
                        content: '2',
                    },
                    {
                        tag: 'button',
                        cls: 'complexity-levels__item',
                        attr: {
                            'data-level': '3',
                        },
                        content: '3',
                    },
                ],
            },
            {
                tag: 'button',
                cls: 'complexity-btn',
                content: 'Старт',
            },
        ],
    };
};
