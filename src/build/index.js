(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Tablero = require('./Tablero.jsx');
var Cabecera = require('./Cabecera.jsx');
var JUGADORX = "jugador 1 - las X";
var JUGADOR0 = "jugador 2 - los 0";
var counter = 0;
var ganador = "-";

var App = React.createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		return {
			turno: JUGADORX,
			valores: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]
		};
	},
	reset: function reset() {
		var initial = this.getInitialState();
		this.setState(initial);
		counter = 0;
		ganador = "-";
	},
	appClick: function appClick(numeroFila, numberoColumna) {
		var valores = this.state.valores;
		var nuevoValor = this.state.turno === JUGADORX ? 'X' : '0';
		valores[numeroFila][numberoColumna] = nuevoValor;
		this.setState({
			turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
			valores: this.state.valores
		});
		counter++;
		if (ganador == "-") {
			for (var n = 0; n < this.state.valores.length; n++) {
				var xx = 0;
				var yx = 0;
				var x0 = 0;
				var y0 = 0;
				for (var i = 0; i < this.state.valores.length; i++) {

					if (this.state.valores[n][i] == 'X') {
						xx++;
					}
					if (this.state.valores[i][n] == 'X') {
						yx++;
					}

					if (this.state.valores[n][i] == '0') {
						x0++;
					}
					if (this.state.valores[i][n] == '0') {
						y0++;
					}
				}

				if (xx == 3 || yx == 3) {
					ganador = "X";
				}

				if (x0 == 3 || y0 == 3) {
					ganador = "0";
				}
			}

			if (this.state.valores[0][0] == "X" && this.state.valores[1][1] == "X" && this.state.valores[2][2] == "X") {
				ganador = "X";
			}
			if (this.state.valores[0][0] == "Y" && this.state.valores[1][1] == "Y" && this.state.valores[2][2] == "Y") {
				ganador = "Y";
			}
			if (this.state.valores[2][0] == "X" && this.state.valores[1][1] == "X" && this.state.valores[0][2] == "X") {
				ganador = "X";
			}
			if (this.state.valores[2][0] == "Y" && this.state.valores[1][1] == "Y" && this.state.valores[0][2] == "Y") {
				ganador = "Y";
			} else if (ganador === "X") {
				alert('GANO JUGADOR X');
			} else if (ganador === "0") {
				alert('GANO JUGADOR 0');
			}
		}

		if (counter == 9 && ganador === "-") {
			alert('EMPATE');
		}
	},
	render: function render() {
		var texto;
		texto = "Turno del " + this.state.turno;
		return React.createElement(
			'div',
			null,
			React.createElement(Cabecera, { texto: texto }),
			React.createElement(Tablero, { valores: this.state.valores,
				manejadorTableroClick: this.appClick }),
			React.createElement('input', { type: 'button', value: 'Reiniciar', onClick: this.reset })
		);
	}
});
module.exports = App;

},{"./Cabecera.jsx":2,"./Tablero.jsx":4}],2:[function(require,module,exports){
"use strict";

var Cabecera = React.createClass({
  displayName: "Cabecera",

  render: function render() {
    return React.createElement(
      "header",
      { className: "cabecera" },
      this.props.texto
    );
  }
});
module.exports = Cabecera;

},{}],3:[function(require,module,exports){
'use strict';

var casillaStyle = {
	height: '100px',
	width: '100px'
};
var Casilla = React.createClass({
	displayName: 'Casilla',

	casillaClick: function casillaClick() {
		if (this.props.valor === "-") {
			this.props.manejadorClick(this.props.indiceFila, this.props.indiceColumna);
		}
	},
	render: function render() {
		return React.createElement(
			'button',
			{ style: casillaStyle, className: this.props.valor === "-" ? "clickable" : "no_clickable", onClick: this.casillaClick },
			this.props.valor
		);
	}
});
module.exports = Casilla;

},{}],4:[function(require,module,exports){
"use strict";

var Casilla = require("./Casilla.jsx");
var Tablero = React.createClass({
  displayName: "Tablero",

  tableroClick: function tableroClick(numeroFila, numeroColumna) {
    this.props.manejadorTableroClick(numeroFila, numeroColumna);
  },
  render: function render() {
    var casillas = this.props.valores.map((function (valoresFila, indiceFila) {
      var fila = valoresFila.map((function (valor, indiceColumna) {
        var mykey = "" + indiceFila + indiceColumna;
        return React.createElement(Casilla, { valor: valor, indiceFila: indiceFila,
          indiceColumna: indiceColumna, key: mykey, manejadorClick: this.tableroClick });
      }).bind(this));
      return React.createElement(
        "div",
        { key: "fila" + indiceFila },
        fila
      );
    }).bind(this));
    return React.createElement(
      "div",
      null,
      casillas
    );
  }
});
module.exports = Tablero;

},{"./Casilla.jsx":3}],5:[function(require,module,exports){
"use strict";

var App = require("./App.jsx");
ReactDOM.render(React.createElement(App, null), document.getElementById('contenedor'));

},{"./App.jsx":1}]},{},[5]);
