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
//! 5.5 Operadores Aritméticos
// *SUMA RESTA MULTIPLICACION DIVISION POTENCIA MODULO ENTRE OTROS...
class Dowhile {
  constructor(condicion, dentrodowhile, fila, column) {
    this.condicion = condicion;
    this.dentrodowhile = dentrodowhile;
    this.fila = fila;
    this.column = column;
  }
  ejecutar(arbolIns, table) {

  }
}
exports.Dowhile = Dowhile;
