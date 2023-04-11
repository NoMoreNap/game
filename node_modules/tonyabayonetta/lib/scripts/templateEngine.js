export default function templateEngine(elem) {
    if ( elem === undefined || elem === false || elem === '' || elem === null) {
        return document.createTextNode('');
    }
    if (typeof elem === 'number' || typeof elem === 'string' || typeof elem === true) {
        return document.createTextNode(elem)
    }
    if ( Array.isArray(elem) ) {
        const frame = document.createDocumentFragment();
        elem.forEach( item => {
            frame.appendChild(templateEngine(item));
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
    const content = templateEngine(elem.content);
    element.appendChild(content); 
    return element;
}