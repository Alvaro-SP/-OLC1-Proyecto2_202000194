var aInstructionAST = require('../Instructions/InstructionAST')
let operations = []
let arbolIns = new aInstructionAST.InstructionAST();

//************ EL AST*************** */
const instruccionesAPI = {
    setInsAST: function (data){
        
        try {
            arbolIns=parser.parse(data.toString());
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