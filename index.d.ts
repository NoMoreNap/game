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

interface screens {
    [selector: string]: () => void;
}

interface blocks {
    [selector: string]: (parent: HTMLElement) => void;
    
}

type appType = {
    blocks: blocks;
    screens: screens ;
    renderScreen: (screen: string) => void;
    renderBlock: (parent: HTMLElement, blocks: string) => void;
    timers: Array<()=>void>;
    stopTimer: () => void;
    alert: (text: string, time: number) => void;
}

declare interface Window {
    application: appType;
}
