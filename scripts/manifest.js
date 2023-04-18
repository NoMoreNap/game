const app = document.querySelector('.app');

window.application = {
    blocks: {},
    screens: {},
    renderScreen: function (screen) {
        if (app.childNodes.length) {
            app.removeChild(app.firstChild);
        }
        this.screens[screen]();
    },
    renderBlock: function (parent, block) {
        this.blocks[block](parent);
    },
};

const $app = window.application;
