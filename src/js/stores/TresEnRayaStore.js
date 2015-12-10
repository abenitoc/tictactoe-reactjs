const EventEmitter = require('events').EventEmitter;
var TresEnRayaDispatcher = require('../dispatchers/TresEnRayaDispatcher.js');
var Constants = require('../constants/TresEnRayaConstants.js');
var turno = Constants.JUGADORX;
var movement_counter = 0;
var ganador = "-";
var valoresTablero = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

var TresEnRayaStore = Object.assign({}, EventEmitter.prototype, {
  getTurno: function () {
    return turno;
  },
  getValores: function () {
    return valoresTablero;
  },
  getContadorMovimiento: function(){
    return movement_counter;
  },
  thereIsGanador: function(){
    return ganador;
  },
  comprobarVictoria: function(){
    if (ganador == "-"){
			for(let n = 0; n < valoresTablero.length; n++){
					let xx = 0;
					let yx = 0;
					let x0 = 0;
					let y0 = 0;
				for(let i = 0; i < valoresTablero.length; i++){

					if (valoresTablero[n][i] == 'X'){
						xx++;
					}
					if (valoresTablero[i][n] == 'X'){
						yx++;
					}

					if (valoresTablero[n][i] == '0'){
						x0++;
					}
					if (valoresTablero[i][n] == '0'){
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


			if ( valoresTablero[0][0] == "X" && valoresTablero[1][1] == "X" && valoresTablero[2][2] == "X" ){ganador = "X";}
			if ( valoresTablero[0][0] == "0" && valoresTablero[1][1] == "0" && valoresTablero[2][2] == "0" ){ganador = "0";}
			if ( valoresTablero[2][0] == "X" && valoresTablero[1][1] == "X" && valoresTablero[0][2] == "X" ){ganador = "X";}
			if ( valoresTablero[2][0] == "0" && valoresTablero[1][1] == "0" && valoresTablero[0][2] == "0" ){ganador = "0";}


			else if(ganador === "X"){
				alert('GANO JUGADOR X');
			}

			else if(ganador === "0"){
				alert('GANO JUGADOR 0');
			}
		}

		if(movement_counter == 9 && ganador === "-"){
			alert('EMPATE');
		}
  },
  addChangeListener(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  emitChange() {
    this.emit(Constants.CHANGE_EVENT);
  }
});

TresEnRayaDispatcher.register(function (payload) {
  switch (payload.type) {
    case Constants.ActionTypes.JUGAR_POSICION:
      let nuevoValor = turno === Constants.JUGADORX ? 'X' : '0';
      turno = turno === Constants.JUGADORX ? Constants.JUGADOR0 : Constants.JUGADORX;
      valoresTablero[payload.x][payload.y] = nuevoValor;
      movement_counter++;
      TresEnRayaStore.comprobarVictoria();
      TresEnRayaStore.emitChange();
    break;
    case Constants.ActionTypes.REINICIAR_JUEGO:
      valoresTablero = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
      movement_counter = 0;
      ganador = "-";
  		turno = Constants.JUGADORX
  		TresEnRayaStore.emitChange();
		break;
  }
});

module.exports = TresEnRayaStore;
