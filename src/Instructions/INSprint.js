const nodo = require("./nodo")
const InstructionsAST = require("./InstructionAST")


Object.defineProperty(exports, "__esModule", { value: true });
exports.print = void 0;

//*************************************************************************** 
//!------------------------------- INSTRUCCION PRINT----------------------------
class print extends nodo{
    constructor(data, line, column){
        this.data=data;
        this.line=line;
        this.column=column;
    }
    run(){
        InstructionsAST.console.push(this.data);
        return null;
    }
}
exports.print = print;