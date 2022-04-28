var InstructionAST = require('../Instructions/ASTGlobal/InstructionAST')
var INSContinue = require('../Instructions/Continue')
var INSbreak = require('../Instructions/Break')
var aErrores = require('../Instructions/Errores/Errorlist')
var parser = require('../Interpreter/myGrammar');
var Tablita = require("../Instructions/TS/TablaSimbolos");
// const instruccionesAPI	= require('../Interpreter/interprete').instruccionesAPI; //las instrucciones de la API
let operations = []
var arbolIns = new InstructionAST.InstructionAST();
var NodosAST // son todos los nodos para generar el AST
var arbolInsSIHAYERRORES = new InstructionAST.InstructionAST();
var ErroresTable = new aErrores.Errorlist();
var table
//************ EL AST*************** */
const instruccionesAPI = {
    setInsAST: function (data){
        try {
			console.log(data.toString());
			//! en este caso genero mi arbol AST el cual contiene todos los datos de 
			//! las acciones que voy a ejecutar y asi poder generar mis reportes
            var respuestaJISON=parser.parse(data.toString()); //retorna algo asi: [arbolIns, nodoAST]
			if(respuestaJISON instanceof Array){
				arbolIns=respuestaJISON[0];
				NodosAST=respuestaJISON[1];
				console.log("☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻INICIO☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻")
				console.log("lexicos")
				console.log(parser.erroreslexicos)
				console.log("respuestaJISON[0]")
				console.log(respuestaJISON[0])
				console.log("☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻FIN☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻")
				// console.log("respuestaJISON[1]")
				// console.log(respuestaJISON[1])
			}else{
				arbolIns=respuestaJISON;
			}

			//! Creo mi tabla de simbolos la cual me servira para mi patron interprete
			table = new Tablita.TablaSimbolos(null);
			if (arbolIns){
				// console.log(arbolIns)
				// si mi tetorno JISON es un arbol entonces prosigo

				//Ahora necesito correr cada una de mis filaas y mandarlas a ejecutar
				//esto se me ocurre colocar a cada clase (AMBITO E INSTRUCCION) una funcion ejecucion
				// el cual empezara con la ejecucion del mismo y se tenga un orden por cada ambito y lugar el cual corresponda realizarlo
				// Map...
				if (arbolIns.ins != null){
					arbolIns.ins.map((instruccion) => {
						try {
							// console.log(instruccion)
							// console.log("---------------------------------")
							var retornado = instruccion.ejecutar(arbolIns, table);
							if(retornado instanceof INSContinue.Continue){
								arbolIns.setError(instruccionesAPI.errorSemantico("No se puede tener el continue fuera de un ciclo ",retornado.fila,retornado.column));
								arbolIns.console.push("(ERROR SEMANTICO) No se puede tener el continue fuera de un ciclo  "+retornado.fila+' : '+retornado.column);
							}else if(retornado instanceof INSbreak.Break){
								arbolIns.setError(instruccionesAPI.errorSemantico("No se puede tener el break fuera de un ciclo ",retornado.fila,retornado.column));
								arbolIns.console.push("(ERROR SEMANTICO) No se puede tener el continue fuera de un ciclo  "+retornado.fila+' : '+retornado.column);
							}
						} catch (error) {
						//* si no se pudo ejecutar una instruccion simplemente se agregara al error sintactico
						//* y luego seguira recorriendo las demas instrucciones para que no se quede trabado :v
						console.log(error);
						var sintacticerror ="Detectado error Sintactico para la instruccion actual NO se puede recuperar. Salto a la siguiente.";
						arbolIns.setError(this.errorsintactico(sintacticerror, 0, 0));
						arbolIns.console.push(error + "\n" + sintacticerror + " ");
						}
					});
				}
				arbolIns.ast = NodosAST;
				arbolIns.symbolTable=table;
				for (var i = 0; i < parser.erroreslexicos.length; i++) {
					console.log(parser.erroreslexicos)
					arbolIns.setError(parser.erroreslexicos[i]);
				}
				return arbolIns;
			}// sino entonces voy a ver los errores sintacticos
			else{
				console.log("problema")
				if(arbolIns != null){
					// arbolInsSIHAYERRORES.setError("ERROR CRITICO");
					for (var i = 0; i < parser.erroreslexicos.length; i++) {
						console.log(parser.erroreslexicos[i])
						arbolInsSIHAYERRORES.setError(parser.erroreslexicos[i]);
					}
					return arbolInsSIHAYERRORES
				}
			}
		}catch(error){
			     console.log(error);
			// console.log(error.hash)
			console.log('Ha ocurrido un error SINTACTICO, se esperaba '+error.hash.expected+' en la linea '+error.hash.line+' columna '+error.hash.loc.first_column);
			arbolInsSIHAYERRORES.console.push('Ha ocurrido un error SINTACTICO, se esperaba '+error.hash.expected+ ' y se recibio: '+error.hash.text+ ' de tipo '+error.hash.token+' en la linea '+error.hash.line+' columna '+error.hash.loc.first_column);
			// arbolInsSIHAYERRORES.error.push('Ha ocurrido un error SINTACTICO, se esperaba'+error.hash.expected+' en la linea '+error.hash.line+' columna '+error.hash.loc.first_column);
            console.log(error.hash)
			arbolInsSIHAYERRORES.setError(
				instruccionesAPI.errorsintactico(
					'Ha ocurrido un error SINTACTICO, se esperaba '+error.hash.expected+ ' y se recibio: '+error.hash.text+ ' de tipo '+error.hash.token,error.hash.line,error.hash.loc.first_column));
			console.log("si se ha retornado.....................................")
			for (var i = 0; i < parser.erroreslexicos.length; i++) {
				console.log(parser.erroreslexicos)
				arbolInsSIHAYERRORES.setError(parser.erroreslexicos[i]);
			}
			return arbolInsSIHAYERRORES;
		}
        // } catch (error) {
       
        // }
    },
	errorLexico:function(error,fila, column){
		return{
			tipo: "LEXICO",
			error: error,
			fila: fila,
			column: column
		};
	},
	errorsintactico: function(error,fila,column){
		console.log("ERROR SINTACTICO");
		return{
			tipo: "SINTACTICO",
			error: error,
			fila: fila,
			column: column
		};
	},
	errorSemantico: function(error,fila,column){
		console.log("ERROR SEMANTICO");
		return{
			tipo: "SEMANTICO",
			error: error,
			fila: fila,
			column: column
		};
	},
	getConsole: function(){
		return arbolIns.getConsole();
	},
	getAST: function(){
		return arbolIns;
	},
	getErrores: function(){
		return ErroresTable;
	}
}
// const instruccionesAPI = {	
// 	addOperation: function(valor) {
// 		operations.push({valor: valor});
// 	},

//     getActive: function() {
// 		return true;
// 	}
// }
module.exports.instruccionesAPI = instruccionesAPI;