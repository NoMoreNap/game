import CustomAlert from '../node_modules/tonyabayonetta/lib/templates/custom_alert/custom_alert.js';
import MainScreen from '../screens/main-screen.js';
import Game from '../screens/game.js';
import Timer from '../blocks/timer.js';
import AgainBtn from '../blocks/again-btn.js';
import CardField from '../blocks/card-field.js';

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
