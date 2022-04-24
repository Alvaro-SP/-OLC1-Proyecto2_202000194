var InstructionAST = require('../Instructions/ASTGlobal/InstructionAST')
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
				console.log("respuestaJISON[0]")
				console.log(respuestaJISON[0])
				console.log("respuestaJISON[1]")
				console.log(respuestaJISON[1])
			}else{
				arbolIns=respuestaJISON;
			}

			//! Creo mi tabla de simbolos la cual me servira para mi patron interprete
			table = new Tablita.TablaSimbolos(null);
			if (arbolIns){
				console.log(arbolIns)
				// si mi tetorno JISON es un arbol entonces prosigo

				//Ahora necesito correr cada una de mis lineas y mandarlas a ejecutar
				//esto se me ocurre colocar a cada clase (AMBITO E INSTRUCCION) una funcion ejecucion
				// el cual empezara con la ejecucion del mismo y se tenga un orden por cada ambito y lugar el cual corresponda realizarlo
				// Map...
				if (arbolIns.ins != null){
					arbolIns.ins.map((instruccion) => {
						try {
							console.log(instruccion)
							console.log("---------------------------------")
							var retornado = instruccion.ejecutar(arbolIns, table);
						} catch (error) {
						//* si no se pudo ejecutar una instruccion simplemente se agregara al error sintactico
						//* y luego seguira recorriendo las demas instrucciones para que no se quede trabado :v
						console.log(error);
						var sintacticerror ="Detectado error Sintactico para la instruccion actual NO se puede recuperar. Salto a la siguiente.";
						console.error(
							"Este es un error sintactico: " +
							"Irrecuperable" +
							", en la linea: " +
							"a" +
							", en la columna: " +
							"a");
						arbolIns.setError(this.errorsintactico(sintacticerror, 0, 0));
						arbolIns.console.push(error + "\n" + sintacticerror + " ");
						}
					});
				}
				arbolIns.ast = NodosAST;
				arbolIns.symbolTable=table;
				return arbolIns;
			}// sino entonces voy a ver los errores sintacticos
			else{
				console.log("problema")
				if(arbolIns != null){
					arbolInsSIHAYERRORES.setError(arbolIns);
					return arbolInsSIHAYERRORES
				}
			}
        } catch (error) {
            console.log(error);
            return;
        }
    },
	errorLexico:function(error,line, column){
		return{
			tipo: "LEXICO",
			error: error,
			line: line,
			column: column
		};
	},
	errorsintactico: function(error,line,column){
		console.log("ERROR SINTACTICO");
		return{
			tipo: "SINTACTICO",
			error: error,
			line: line,
			column: column
		};
	},
	errorSemantico: function(error,line,column){
		console.log("ERROR SEMANTICO");
		return{
			tipo: "SEMANTICO",
			error: error,
			line: line,
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