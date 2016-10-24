var juego = {
	 filas:[ [], [], []],
	 espacioVacio:{
	 	fila:2,
	 	columna:2
	 },
	 crearPieza: function(numero,fila,columna){
	 	var pieza = $('<div>');
	 	pieza.addClass("pieza").css({
	 		backgroundImage:"url(Piezas/" + numero + ".jpg)",
	 		top: fila*200,
	 		left: columna*200,
	 	});

	 	return {
	 		elemento: pieza,
	 		filaInicial: fila,
	 		columnaInicial: columna,
	 	};

	 },

	 instalarPieza: function(elemento){
	 	var counter = 1;
	 	for (var fila = 0; fila < 3; fila++) {
	 		for (var columna = 0; columna < 3; columna++) {
	 			if (columna == this.espacioVacio.columna && fila == this.espacioVacio.fila) {
	 				this.filas[fila][columna] = null;

	 			}else {
	 				var pieza = this.crearPieza(counter++,fila,columna);
          			elemento.append(pieza.elemento);
          			this.filas[fila][columna] = pieza;
	 			}
	 		}
		}
		inicial = this.filas;
		return juego
	 },

	 moverHaciaAbajo:function(){
		var filaOriginal = this.espacioVacio.fila-1;
    	var columnaOriginal = this.espacioVacio.columna;
	    this.intercambiarPosicionConEspacioVacio(filaOriginal,columnaOriginal);
	},
	 moverHaciaArriba:function(){
	 		var filaOriginal = this.espacioVacio.fila+1;
    		var columnaOriginal = this.espacioVacio.columna;
    		this.intercambiarPosicionConEspacioVacio(filaOriginal,columnaOriginal);
	 },
	 moverHaciaLaDerecha:function(){
	 		var filaOriginal = this.espacioVacio.fila;
    	var columnaOriginal = this.espacioVacio.columna-1;
	    this.intercambiarPosicionConEspacioVacio(filaOriginal,columnaOriginal);
	 },
	 moverHaciaLaIzquierda:function(){
	 		var filaOriginal = this.espacioVacio.fila;
    	var columnaOriginal = this.espacioVacio.columna+1;
	    this.intercambiarPosicionConEspacioVacio(filaOriginal,columnaOriginal);
	 },

	 capturarTeclas: function(){
	 	var that = this;
	 	$(document).keydown(function(event){
		 	switch(event.which){
		 		case 40:
		 		 	that.moverHaciaAbajo();
		 		 	break;
		 		case 38:
		 		 	that.moverHaciaArriba();
		 		 	break;
		 		case 39: 
		 			that.moverHaciaLaDerecha();
		 			break;
		 		case 37:
		 		 	that.moverHaciaLaIzquierda(); 
		 		 	break;
		 		default: return;
		 	}
		 	event.preventDefault();
		 	that.chequearSiGano();
	 	});
	 },

	 moverFichaColumna: function(pieza, fila, columna){
	 	pieza.elemento.css({
	 		top: fila *200,
	 		left: columna * 200 
	 	});
	 },

	 guardarEspacioVacio: function(fila, columna){
	 	this.espacioVacio.fila = fila;
	 	this.espacioVacio.columna = columna;
	 	this.filas[fila][columna] = null;
	 },

	 intercambiarPosicionConEspacioVacio: function(fila, columna){
	 	var pieza = this.filas[fila] && this.filas[fila][columna];
		if (pieza) {
			this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = pieza;
			this.moverFichaColumna(pieza, this.espacioVacio.fila, this.espacioVacio.columna);
			this.guardarEspacioVacio(fila, columna);
		}
	 },

	 mezclarPiezas(veces){
	 
		var metodos = ["moverHaciaAbajo","moverHaciaArriba","moverHaciaLaIzquierda","moverHaciaLaDerecha"];
		for (var i=0; veces > i; i++) {
			var numeroRandom = Math.floor(Math.random() * 4);
			var nombreDeMetodo = metodos[numeroRandom];
			this[nombreDeMetodo]();
		}
		return true;

	},

	chequearSiGano(){
		for (var fi = 0; fi < 3; fi++) {
			for (var co = 0; co < 3; co++) {
				var piezaActual = this.filas[fi][co];
				if(piezaActual && !(piezaActual.filaInicial == fi && piezaActual.columnaInicial == co) ){
					
					return false;	
				} 
			}	
		}
		alert("ganaste!");
	},

	 iniciar: function(juego){
	 	this.instalarPieza(juego);
	 	this.capturarTeclas();
	 	this.mezclarPiezas(100);

	 }
};

$(document).ready(function(){
	var elemento = $("#juego");
  	juego.iniciar(elemento);
});