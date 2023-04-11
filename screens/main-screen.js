import templateEngine from '../node_modules/tonyabayonetta/lib/scripts/templateEngine.js'

export default class MainScreen {
    constructor (element) {
        element.append(templateEngine(MainScreen.TEMPLATE()))
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