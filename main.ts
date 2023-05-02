import './style/style.css';
import CustomAlert from './node_modules/tonyabayonetta/lib/templates/custom_alert/custom_alert';
import MainScreen from './screens/main-screen';
import Game from './screens/game';
import Timer from './blocks/timer';
import AgainBtn from './blocks/again-btn';
import CardField from './blocks/card-field';
import Result from './blocks/end-game';

const app = document.querySelector('.app')!;

window.application = {
    blocks: {},
    screens: {},
    renderScreen: function (screen: string) {
        this.timers.forEach((el: any) => {
            clearInterval(el)
        });
        if (app.childNodes.length) {
            app.removeChild(app.firstChild!);
        }
        this.screens[screen]();
    },
    renderBlock: function (parent: HTMLElement, block: string) {
        this.blocks[block](parent);
    },
    timers: [],
    stopTimer: () => {
        window.application.timers.forEach((el:any) => {
            clearInterval(el)
        }) 
    },
    alert: function (text: string, time: number) {
        const newAlert = new CustomAlert(app, text);
        newAlert.toRemove(time);
    }

};

// screens
function renderMainScreen() {
    const render = new MainScreen(app);
}
function renderGameScreen() {
    const render = new Game(app);
}
// blocks
function renderTimer(parent: HTMLElement) {
    const render = new Timer(parent);
}
function renderAgainBtn(parent: HTMLElement) {
    const render = new AgainBtn(parent);
}
function renderCardField(parent: HTMLElement) {
    const render = new CardField(parent);
}
function renderLoseScreen(parent: Element) {
    const render = new Result(parent,'lose');
}
function renderWinScreen(parent: Element) {
    const render = new Result(parent,'win');
}

// to push
const $app = window.application;
$app.screens['main-screen'] = renderMainScreen;
$app.screens['game'] = renderGameScreen;
$app.blocks['timer'] = renderTimer;
$app.blocks['btn'] = renderAgainBtn;
$app.blocks['card-field'] = renderCardField;
$app.blocks['lose'] = renderLoseScreen;
$app.blocks['win'] = renderWinScreen;



// any customs

!localStorage.getItem('inGame')
    ? $app.renderScreen('main-screen')
    : $app.renderScreen('game');

