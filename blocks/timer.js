import templateEngine from '../node_modules/tonyabayonetta/lib/scripts/templateEngine.js';

export default class Timer {
    constructor(element) {
        this.element = element;
        this.element.appendChild(templateEngine(Timer.TEMPLATE('00', '00')));
    }
}

Timer.TEMPLATE = (min, sec) => {
    return {
        attr: {},
        cls: ['game-timer'],
        tag: 'div',
        content: [
            {
                attr: {},
                cls: ['game-timer_nav'],
                tag: 'div',
                content: [
                    {
                        attr: {},
                        cls: ['game-timer_min'],
                        tag: 'div',
                        content: [
                            {
                                tag: 'span',
                                content: 'min',
                            },
                            {
                                attr: {
                                    id: 'min',
                                },
                                tag: 'span',
                                content: min,
                            },
                        ],
                    },
                    {
                        attr: {},
                        cls: ['game-timer_sec'],
                        tag: 'div',
                        content: [
                            {
                                tag: 'span',
                                content: 'sec',
                            },
                            {
                                attr: {
                                    id: 'sec',
                                },
                                tag: 'span',
                                content: '.' + sec,
                            },
                        ],
                    },
                ],
            },
        ],
    };
};
