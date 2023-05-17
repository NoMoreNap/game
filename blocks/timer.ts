import templateEngine from '../node_modules/tonyabayonetta/lib/scripts/templateEngine';

export default class Timer {
    element: Element;
    timer: Element;
    static TEMPLATE: (min: string, sec: string) => object;
    constructor(element: Element) {
        this.element = element;
        this.element.appendChild(templateEngine(Timer.TEMPLATE('00', '00')));
        this.timer = document.querySelector('.game-timer_nav')!;

        this.timerStart = this.timerStart.bind(this);
        this.timerEnd = this.timerEnd.bind(this);

        if (!localStorage.getItem('inCurrentGame')) {
            setTimeout(() => {
                this.timerStart();
            }, 5000);
        } else {
            this.timer.querySelector('#min')!.textContent = localStorage.getItem('min');
            this.timer.querySelector('#sec')!.textContent = localStorage.getItem('sec');
            this.timerStart();
        }
    }

    timerStart() {
        window.application.timers.push(
            setInterval(() => {
                if (localStorage.getItem('sec')) {
                    let min = Number(localStorage.getItem('min'))!;
                    let sec = Number(localStorage.getItem('sec')!.replace('.', '')) + 1;
                    if (sec === 59 && min === 59) {
                        return this.timerEnd();
                    }
                    this.timer.querySelector('#min')!.textContent = localStorage.getItem('min');
                    this.timer.querySelector('#sec')!.textContent = localStorage.getItem('sec');
                    if (sec < 10) {
                        localStorage.setItem('sec', '.0' + String(sec));
                    } else {
                        localStorage.setItem('sec', '.' + String(sec));
                    }
                    if (sec > 59) {
                        sec = 0;
                        min += 1;
                        localStorage.setItem('sec', '.0' + String(sec));
                        if (min < 10) {
                            localStorage.setItem('min', '0' + String(min));
                        } else {
                            localStorage.setItem('min', String(min));
                        }
                    }
                } else {
                    let min = Number(this.timer.querySelector('#min')!.textContent);
                    let sec = Number(this.timer.querySelector('#sec')!.textContent?.replace('.', '')) + 1;
                    localStorage.setItem('sec', '.0' + String(sec));
                    localStorage.setItem('min', '0' + String(min));
                    this.timer.querySelector('#min')!.textContent = localStorage.getItem('min');
                    this.timer.querySelector('#sec')!.textContent = localStorage.getItem('sec');
                }
            }, 1000)
        );
    }

    timerEnd() {
        window.application.timers.forEach((el: any) => {
            clearInterval(el);
            localStorage.removeItem('sec');
            localStorage.removeItem('min');
        });
        window.application.renderBlock(document.querySelector('.app')!, 'lose');
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
