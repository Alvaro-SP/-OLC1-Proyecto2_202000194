"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");

class id {
  constructor(id, fila, column) {
    this.id = id;
    this.fila = fila;
    this.column = column;
  }
  ejecutar(arbolIns, table) {
    var value;

    value = table.getSimbol(this.id);
    console.log("Este es el Simbolo encontrado de ID: "+this.id)
    console.log(value)
    if (value == null || value == undefined) {
      arbolIns.setError(
        instruccionesAPI.errorSemantico(
          "No se ha encontrado la variable (" + this.id + ") se obtuvo null",
          this.fila,
          this.column
        )
      );
      return new val.val(
        this.fila,
        this.column,
        Tipo.ERROR,
        "No se ha encontrado la variable **" + this.id + "** se obtuvo null"
      );
    }
    this.tipo = value.tipo;
    this.valor = value.data;
    return value.data;
  }
}
exports.id = id;
