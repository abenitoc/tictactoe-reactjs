const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');

var React = require('react');

var TresEnRayaStore = require('../stores/TresEnRayaStore.js');
var TresEnRayaActions = require('../actions/TresEnRayaActions.js')

function getAppStateFromStore() {
	return {
		turno: TresEnRayaStore.getTurno(),
		valores: TresEnRayaStore.getValores(),
		movimientos: TresEnRayaStore.getContadorMovimiento()
	};
}

var App = React.createClass({
getInitialState: function(){
	return getAppStateFromStore();
},
componentDidMount() {
	TresEnRayaStore.addChangeListener(this._onChange);
},
componentWillUnmount() {
	TresEnRayaStore.removeChangeListener(this._onChange);
},
_onChange: function() {
	this.setState(getAppStateFromStore());
},
resetGame: function(){
	TresEnRayaActions.reiniciarJuego();
},
render: function(){
	var texto = "Turno del " + this.state.turno + " - Movimiento:" + this.state.movimientos;
	return (
			<div>

			<Cabecera texto={texto}/>

			<Tablero valores={this.state.valores}/>
			<button onClick={this.resetGame}> Reiniciar Juego</button>
			</div>
		)

	}
});

module.exports = App;
