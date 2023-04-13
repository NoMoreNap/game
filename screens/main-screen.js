import templateEngine from '../node_modules/tonyabayonetta/lib/scripts/templateEngine.js'

export default class MainScreen {
    constructor (element) {
        element.append(templateEngine(MainScreen.TEMPLATE()))

        $('.complexity-levels').click(this.clickOnLevel);
        $('.complexity-btn').click(this.startClick)

    }

    clickOnLevel(e) {
        const target = e.target
        $('.complexity-levels__item').removeClass('active');
        target.classList.add('active');
        localStorage.setItem('complexity', target.dataset.level);
    }

    startClick() {
        if (!$('.complexity-levels__item').hasClass('active')) {
            return $app.alert('Выберите уровень сложности!',1000)
        }
        $app.renderScreen('game')
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
                content: 'Выбери сложность'
            },{
                tag: 'div',
                cls: 'complexity-levels',
                content: [
                    {
                        tag: 'button',
                        cls: 'complexity-levels__item',
                        attr: {
                            'data-level': '1'
                        },
                        content: '1'
                    },{
                        tag: 'button',
                        cls: 'complexity-levels__item',
                        attr: {
                            'data-level': '2'
                        },
                        content: '2'
                    },{
                        tag: 'button',
                        cls: 'complexity-levels__item',
                        attr: {
                            'data-level': '3'
                        },
                        content: '3'
                    }
                ]
            }, {
                tag: 'button',
                cls: 'complexity-btn',
                content: 'Старт'
            }
        ]
    }
}