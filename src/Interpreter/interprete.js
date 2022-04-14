var aInstructionAST = require('../Instructions/ASTGlobal/InstructionAST')
var aErrores = require('../Instructions/Errores/Errorlist')
var parser = require('../Interpreter/myGrammar');
var Tablita = require("../Instructions/TS/TablaSimbolos");
// const instruccionesAPI	= require('../Interpreter/interprete').instruccionesAPI; //las instrucciones de la API
let operations = []
var arbolIns = new aInstructionAST.InstructionAST();
var arbolInsSIHAYERRORES = new aInstructionAST.InstructionAST();
var ErroresTable = new aErrores.Errorlist();
var table
//************ EL AST*************** */
const instruccionesAPI = {
    setInsAST: function (data){
        try {
			console.log(data.toString());
			//! en este caso genero mi arbol AST el cual contiene todos los datos de 
			//! las acciones que voy a ejecutar y asi poder generar mis reportes
            arbolIns=parser.parse(data.toString());
			//! Creo mi tabla de simbolos la cual me servira para mi patron interprete
			table = new Tablita.Table(null)
			if (arbolIns instanceof aInstructionAST.InstructionAST){
				// si mi tetorno JISON es un arbol entonces prosigo
			}// sino entonces voy a ver los errores sintacticos
			else{
				if(arbolIns != null){
					arbolInsSIHAYERRORES.setError(this.errorsintactico(arbolIns));
				}
			}
			//Ahora necesito correr cada una de mis lineas y mandarlas a ejecutar 
			//esto se me ocurre colocar a cada clase (AMBITO E INSTRUCCION) una funcion ejecucion
			// el cual empezara con la ejecucion del mismo y se tenga un orden por cada ambito y lugar el cual corresponda realizarlo
			// Map...
			arbolIns.ins.map((instruccion)=>{
				try {
					var retornado = instruccion.ejecutar(arbolIns, table);
				} catch (error) {
					//* si no se pudo ejecutar una instruccion simplemente se agregara al error sintactico 
					//* y luego seguira recorriendo las demas instrucciones para que no se quede trabado :v
					console.log(error);
					var sintacticerror="Detectado error Sintactico para la instruccion actual NO se puede recuperar. Salto a la siguiente.";
					console.error('Este es un error sintactico: ' + 'Irrecuperable' + ', en la linea: ' + 'a' + ', en la columna: ' + 'a');
					arbolIns.setError(this.errorsintactico(sintacticerror,0,0));
					arbolIns.console.push(error+'\n'+sintacticerror+' ')
				}
			});
            return arbolIns;
        } catch (error) {
            console.error(error);
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