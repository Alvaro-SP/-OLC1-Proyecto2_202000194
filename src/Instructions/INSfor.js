"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dowhile = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const Tablita = require("./TS/TablaSimbolos");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const {INSBreak} = require('../Instructions/break');
const {INSContinue} = require('../Instructions/continue');
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.17 Sentencias cíclicas▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// *5.17.2. For
class For {
  constructor(fordeclarar, expre, actua,ins , fila, column) {
    this.fordeclarar = fordeclarar;
    this.expre = expre;
    this.actua = actua;
    this.ins = ins;
    this.fila = fila;
    this.column = column;
  }
  ejecutar(arbolIns, table) {
    
  }
}
exports.For = For;
