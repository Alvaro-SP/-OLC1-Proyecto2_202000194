"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");

class id {
  constructor(id, line, column) {
    this.id = id;
    this.line = line;
    this.column = column;
  }
  ejecutar(arbolIns, table) {
    var value;
    value = table.getSimbol(this.id);
    if (value == null) {
      arbolIns.setError(
        instruccionesAPI.errorSemantico(
          "No se ha encontrado la variable " + this.id + " se obtuvo null",
          this.line,
          this.column
        )
      );
      return new val(
        this.line,
        this.column,
        Tipo(tipo.ERROR),
        "No se ha encontrado la variable " + this.id + " se obtuvo null"
      );
    }
    this.tipo = value.tipo;
    this.valor = value.valor;
    return value.valor;
  }
}
exports.id = id;