declare module '*.css';
declare module '*custom_alert' {
    export default class CustomAlert {
        static TEMPLATE: void;
        static TEMPLATE_ENGINE: void;
        element: HTMLElement;
        constructor(element: Element, text: string);
        toRemove(time: number): void;
    }
}


declare module '*templateEngine' {
    export default function templateEngine(elem: object): Node;
}


declare interface Window {
    application: any;
}
