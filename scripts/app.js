import CustomAlert from '../node_modules/tonyabayonetta/lib/templates/custom_alert/custom_alert.js'
import MainScreen from '../screens/main-screen.js'
import Game from '../screens/game.js'

// screens
function renderMainScreen() {
    const render = new MainScreen(app)
}
function renderGameScreen() {
    const render = new Game(app)
}
// blocks


// to push 

$app.screens['main-screen'] = renderMainScreen;
$app.screens['game'] = renderGameScreen;


// any customs 
$app.alert = function(text,time) {
    const newAlert = new CustomAlert(app,text)
    newAlert.toRemove(time)
}


