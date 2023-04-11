export default class CustomConfirm {
    constructor(element, {
        text = '',
        onTrue = () => {},
        onFalse = () => {}
    }) {
        if(!element instanceof HTMLElement) {
            throw new Error('Передан не html элемент')
        }
        this.element = element
        this.element.appendChild(CustomConfirm.TEMPLATE_ENGINE(CustomConfirm.TEMPLATE(text)))

        document.querySelector('.confirm-nav').addEventListener('click', this.btnClick = (e) => {
            const target = e.target
            switch (target.dataset.confirm) {
                case 'true':
                    onTrue()
                    document.querySelector('.confirm-wrapper').remove()
                    break;
            
                case 'false':
                    onFalse()
                    document.querySelector('.confirm-wrapper').remove()
                    break;
            }

        })

    }
}

CustomConfirm.TEMPLATE = (text) => {
    return {
            "tag": "section",
            "cls": "confirm-wrapper",
            "content": {
                "tag": "div",
                "cls": ["confirm", "puff-in-center"],
                "content": [
                    {
                        "tag": "h1",
                        "cls": "confirm-title",
                        "content": text
                    },{
                        "tag": "div",
                        "cls": "confirm-nav",
                        "content": [
                            {
                                "tag": "button",
                                "cls": "confirm-btn",
                                "attr": {
                                    "data-confirm": "true"
                                },
                                "content": "Да"
                            },{
                                "tag": "button",
                                "cls": "confirm-btn",
                                "attr": {
                                    "data-confirm": "false"
                                },
                                "content": "Нет"
                            }
                        ]
                    }
                ]
            }
        }
}

CustomConfirm.TEMPLATE_ENGINE = (elem) => {
    if ( elem === undefined || elem === false || elem === '' || elem === null) {
        return document.createTextNode('');
    }
    if (typeof elem === 'number' || typeof elem === 'string' || typeof elem === true) {
        return document.createTextNode(elem)
    }
    if ( Array.isArray(elem) ) {
        const frame = document.createDocumentFragment();
        elem.forEach( item => {
            frame.appendChild(CustomConfirm.TEMPLATE_ENGINE(item));
        })
        return frame;
    }
    const element = document.createElement(elem.tag);
    if (elem.attr) {
        const keys = Object.keys(elem.attr);
        keys.forEach(key => {
            element.setAttribute(key, elem.attr[key]);
        })
    }
    if (elem.cls) {
        element.classList.add(...[].concat(elem.cls).filter(Boolean));
    }
    const content = CustomConfirm.TEMPLATE_ENGINE(elem.content);
    element.appendChild(content); 
    return element;
}