// const nodoAST = require("./nodoAST")
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionAST = void 0;
var  TablaSimbolos = require('../TS/TablaSimbolos');
//*************************************************************************** */
//!---------------------- ARBOLES DE AST CON LAS INSTRUCCIONES----------------------
class InstructionAST {
    constructor(ins){
        this.ins=ins;
        this.symbolTable = new TablaSimbolos(null);//le envio como padre un nulo de primero.
        this.error=new Array();
        this.console=new Array();
        this.variables=new Array();
    }
    setError(error){
        // this.error=error;
        this.error.push(error);
        
    }
    setConsole(console){
        this.console.push(console);
    }
    setVariables(variables){
        this.variables.push(variables);
        // this.variables=variables;
    }
    getConsole(){
        return this.console;
    }
    getVariables(){
        return this.variables;
    }
    getError(){
        return this.error;
    }
}

exports.InstructionAST = InstructionAST;