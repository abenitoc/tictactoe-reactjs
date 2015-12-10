var React = require('react');
var ReactDOM = require('react-dom');
var TresEnRayaActions = require('../actions/TresEnRayaActions.js');
var TresEnRayaStore = require('../stores/TresEnRayaStore.js')

const casillaStyle = {
 height: '100px',
 width: '100px'
};
let Casilla = React.createClass({
 casillaClick: function(){
   if(this.props.valor==="-" && this.isWinner()){
      TresEnRayaActions.jugarPosicion(this.props.indiceFila, this.props.indiceColumna);
   }
 },
 isWinner: function (){
 if(TresEnRayaStore.thereIsGanador() == "-"){
 console.log(TresEnRayaStore.thereIsGanador());
  return true;
 }
 else{
  return false;
 }
 },
 render: function(){
 return (
 <button style={casillaStyle} className={(this.props.valor==="-" && this.isWinner()) ? "clickable":"no_clickable"} onClick={this.casillaClick}> {this.props.valor} </button>
 )
 }
});
module.exports = Casilla;
