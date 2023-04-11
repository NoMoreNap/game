export default class CustomAlert{
    constructor(element, text) {
        if(!(element) instanceof HTMLElement) {
            throw new Error('Передан не HTML элемент!')
        }
        this.element = element
        this.element.appendChild(CustomAlert.TEMPLATE_ENGINE(CustomAlert.TEMPLATE(text)))
    }
    toRemove(time) {
        setTimeout(()=>{document.querySelector('.custom_alert').remove()},time)
    }
}

CustomAlert.TEMPLATE = (text) => {
    return {
        "tag": "div",
        "cls": "custom_alert",
        "content": {
            "tag": "div",
            "cls": ["custom_alert-content", "puff-in-center"],
            "content": {
                "tag": "h1",
                "cls": "custom_alert-text",
                "content": text
            }
        }
    }
}

CustomAlert.TEMPLATE_ENGINE = (elem) => {
        if ( elem === undefined || elem === false || elem === '' || elem === null) {
            return document.createTextNode('');
        }
        if (typeof elem === 'number' || typeof elem === 'string' || typeof elem === true) {
            return document.createTextNode(elem)
        }
        if ( Array.isArray(elem) ) {
            const frame = document.createDocumentFragment();
            elem.forEach( item => {
                frame.appendChild(CustomAlert.TEMPLATE_ENGINE(item));
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
        const content = CustomAlert.TEMPLATE_ENGINE(elem.content);
        element.appendChild(content); 
        return element;
}