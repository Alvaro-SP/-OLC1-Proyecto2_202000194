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
        this.var=new Array();
    }
}
exports.InstructionsAST = InstructionsAST;