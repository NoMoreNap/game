import './style/style.css';
import CustomAlert from './node_modules/tonyabayonetta/lib/templates/custom_alert/custom_alert';
import MainScreen from './screens/main-screen';
import Game from './screens/game';
import Timer from './blocks/timer';
import AgainBtn from './blocks/again-btn';
import CardField from './blocks/card-field';
import toObject from './node_modules/tonyabayonetta/lib/scripts/toObjectEngine';

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

// screens
function renderMainScreen() {
    const render = new MainScreen(app);
}
function renderGameScreen() {
    const render = new Game(app);
}
// blocks
function renderTimer(parent) {
    const render = new Timer(parent);
}
function renderAgainBtn(parent) {
    const render = new AgainBtn(parent);
}
function renderCardField(parent) {
    const render = new CardField(parent);
}

// to push
const $app = window.application;
$app.screens['main-screen'] = renderMainScreen;
$app.screens['game'] = renderGameScreen;
$app.blocks['timer'] = renderTimer;
$app.blocks['btn'] = renderAgainBtn;
$app.blocks['card-field'] = renderCardField;

// any customs
$app.alert = function (text, time) {
    const newAlert = new CustomAlert(app, text);
    newAlert.toRemove(time);
};

!localStorage.getItem('inGame')
    ? $app.renderScreen('main-screen')
    : $app.renderScreen('game');
