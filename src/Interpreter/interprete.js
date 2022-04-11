var aInstructionAST = require('../Instructions/ASTGlobal/InstructionAST')
var aErrores = require('../Instructions/Errores/Errorlist')
var parser = require('../Interpreter/myGrammar');
let operations = []
var arbolIns = new aInstructionAST.InstructionAST();
var ErroresTable = new aErrores.Errorlist();
//************ EL AST*************** */
const instruccionesAPI = {
    setInsAST: function (data){
        try {
			console.log(data.toString());
			//! en este caso genero mi arbol AST el cual contiene todos los datos de 
			//! las acciones que voy a ejecutar y asi poder generar mis reportes
            arbolIns=parser.parse(data.toString());
			//! Creo mi tabla de simbolos la cual me servira para mi patron interprete
			table = new Tabla.Table(null)
			//Ahora necesito correr cada una de mis lineas y mandarlas a ejecutar 
			//esto se me ocurre colocar a cada clase (AMBITO E INSTRUCCION) una funcion ejecucion
			// el cual empezara con la ejecucion del mismo y se tenga un orden por cada ambito y lugar el cual corresponda realizarlo
			// Map...
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