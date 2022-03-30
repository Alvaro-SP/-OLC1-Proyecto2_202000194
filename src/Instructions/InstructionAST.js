// const nodoAST = require("./nodoAST")
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionsAST = void 0;

//*************************************************************************** */
//!---------------------- ARBOLES DE AST CON LAS INSTRUCCIONES----------------------

class InstructionsAST {
    constructor(ins){
        this.ins=ins;
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
    setVar(variables){
        this.variables.push(variables);
        // this.variables=variables;
    }
}
exports.InstructionsAST = InstructionsAST;