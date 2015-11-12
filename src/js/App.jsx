const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');
const JUGADORX = "jugador 1 - las X";
const JUGADOR0 = "jugador 2 - los 0";
let counter = 0;
let ganador = "-";
var App = React.createClass({
	getInitialState: function(){
		return {
			turno: JUGADORX,
			valores: [
				['-', '-', '-'],
				['-', '-', '-'],
				['-', '-', '-']
			]
		};
	},
	reset: function(){
		this.state.turno = JUGADORX;
		this.state.valores = [
			['-', '-', '-'],
			['-', '-', '-'],
			['-', '-', '-']
		];
		counter = 0;
		ganador = "-";
	},
	appClick: function(numeroFila, numberoColumna){
		let valores = this.state.valores;
		let nuevoValor = this.state.turno === JUGADORX ? 'X':'0';
		valores[numeroFila][numberoColumna] = nuevoValor;
		this.setState({
			turno: this.state.turno === JUGADORX ? JUGADOR0:JUGADORX,
			valores: this.state.valores
		});
		counter ++;
		if (ganador == "-"){
			for(let n = 0; n < this.state.valores.length; n++){
					let xx = 0;
					let yx = 0;
					let x0 = 0;
					let y0 = 0;
				for(let i = 0; i < this.state.valores.length; i++){

					if (this.state.valores[n][i] == 'X'){
						xx++;
					}
					if (this.state.valores[i][n] == 'X'){
						yx++;
					}

					if (this.state.valores[n][i] == '0'){
						x0++;
					}
					if (this.state.valores[i][n] == '0'){
						y0++;
					}
				}

				if(xx == 3 || yx == 3 ){
					ganador = "X";
				}

				if(x0 == 3 || y0 == 3 ){
					ganador = "0";
				}
			}


			if ( this.state.valores[0][0] == "X" && this.state.valores[1][1] == "X" && this.state.valores[2][2] == "X" ){ganador = "X";}
			if ( this.state.valores[0][0] == "Y" && this.state.valores[1][1] == "Y" && this.state.valores[2][2] == "Y" ){ganador = "Y";}
			if ( this.state.valores[2][0] == "X" && this.state.valores[1][1] == "X" && this.state.valores[0][2] == "X" ){ganador = "X";}
			if ( this.state.valores[2][0] == "Y" && this.state.valores[1][1] == "Y" && this.state.valores[0][2] == "Y" ){ganador = "Y";}


			else if(ganador === "X"){
				alert('GANO JUGADOR X');
			}

			else if(ganador === "0"){
				alert('GANO JUGADOR 0');
			}
		}

		if(counter == 9 && ganador === "-"){
			alert('EMPATE');
		}

	},
	render: function(){
		var texto;
		texto = "Turno del " + this.state.turno;
		return (
			<div>
			<Cabecera texto={texto}/>
			<Tablero valores={this.state.valores}
			manejadorTableroClick={this.appClick}/>
			<input type="button" value="Reiniciar" inputClick={this.reset} />
			</div>
		)
	}
});
module.exports = App;
