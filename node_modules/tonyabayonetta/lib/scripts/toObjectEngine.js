export default function toObject(elem) {
    const element = {}
    if ( elem === undefined || elem === false || elem === '' || elem === null) {
        return;
    }
    if (elem.attributes.length) {
        element.attr = {}
        for (let att, i = 0, atts = elem.attributes, n = atts.length; i < n; i++){
            att = atts[i];
            if (att.nodeName != 'class') {
                element.attr[att.nodeName] = att.nodeValue
            }
        }
    }
    if (elem.classList.length) {
        element.cls = [];
        elem.classList.forEach(item => {
            element.cls.push(item)
        });
    }
    if (elem.tagName) {
        element.tag = elem.tagName.toLowerCase();
    }
    if (elem.children) {
        element.content = []
        if (elem.children.length) {
            for (const child of elem.children) {
                const content = toObject(child)
                element.content.push(content)         
            }
        } else {
            element.content = elem.textContent;
        }
    } 
    return element
}