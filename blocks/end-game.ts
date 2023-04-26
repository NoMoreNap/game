import templateEngine from '../node_modules/tonyabayonetta/lib/scripts/templateEngine';

export default class Result {
    element: Element;
    result: boolean;
    time: string;
    block: any;
    sec: number
    static RESULT: (result: boolean, time: string) => object;
    constructor(element: Element, result: string, ) {
        if (document.querySelector('.wrapper')) {
            throw new Error('Такой блок уже существует!')
        }
        this.element = element
        this.result = result === 'win' ? true : false 
        this.sec = Number(localStorage.getItem('sec')!.replace('.','')) - 1
        this.time = localStorage.getItem('min')! + (  this.sec < 10 ? String('.0' + this.sec) : String('.' + this.sec))
        
        this.block = templateEngine(Result.RESULT(this.result, this.time))
        this.element.appendChild(this.block)      
        window.application.renderBlock(this.block.querySelector('.result'), ('btn')) 
        
    }
}

Result.RESULT = (result, time) => {
    return {
        "attr": {},
        "cls": [
          "wrapper"
        ],
        "tag": "div",
        "content": [
          {
            "attr": {},
            "cls": [
              "result", "puff-in-center"
            ],
            "tag": "section",
            "content": [
              {
                "attr": {
                  "src": result ? 'src/win.png' : 'src/lose.png',
                  "alt": result ? 'win' : 'lose'
                },
                "tag": "img",
                "content": ""
              },
              {
                "attr": {},
                "cls": [
                  "result-title"
                ],
                "tag": "p",
                "content": result ? 'Вы выиграли!' : 'Вы проиграли!'
              },
              {
                "attr": {},
                "cls": [
                  "result-title_sub"
                ],
                "tag": "p",
                "content": "Затраченное время:"
              },
              {
                "attr": {},
                "cls": [
                  "result-time"
                ],
                "tag": "p",
                "content": time
              }
            ]
          }
        ]
      }
}