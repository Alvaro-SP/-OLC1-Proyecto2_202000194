"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");

class IncreoDecre {
    constructor(id, op, line, column) {
        this.id = id;
        this.op = op;
        this.line = line;
        this.column = column;
    }
    ejecutar(arbolIns, table) {
        let value;
        value = table.getSimbol(this.id);
        if (value != null) {
            if (value.tipo.tipo === Tipo.tipos.ENTERO) {
              if (this.op === "INCREMENT") {
                value.valor = value.valor + 1;
                return table.getSimbol(this.id).valor;
              } else if (this.op === "DECREMENT") {
                value.valor = value.valor - 1;
                return table.getSimbol(this.id).valor;
              } else {
                arbolIns.setError(
                  instruccionesAPI.errorSemantico(
                    "op Invalido, revise que exista o que los tipos coincidan " +
                      value.tipo +
                      " y " +
                      value2.tipo,
                    this.fila,
                    this.column
                  )
                );
                return new val(
                  this.fila,
                  this.column,
                  Tipo.ERROR,
                  "(ERROR SEMANTICO) op Invalido, revise que exista o que los tipos coincidan " +
                    value.tipo +
                    " y " +
                    value2.tipo
                );
              }
            } else if (value.tipo.tipo === Tipo.DOUBLE) {
              if (this.op === "INCREMENT") {
                value.valor = value.valor + 1;
                var tempvalue = table.getSimbol(this.id);
                return tempvalue.valor;
              } else if (this.op === "DECREMENT") {
                value.valor = value.valor - 1;
                var tempvalue = table.getSimbol(this.id);
                return tempvalue.valor;
              } else {
                arbolIns.setError(
                  instruccionesAPI.errorSemantico(
                    "No se puede aumentar/disminuir a una variable de tipo " +
                      value.tipo,
                    this.fila,
                    this.column
                  )
                );
                return new val(
                  this.line,
                  this.column,
                  Tipo.ERROR,
                  "(ERROR SEMANTICO) No se puede aumentar/disminuir a una variable de tipo " +
                    value.tipo
                );
              }
            } else {
              arbolIns.setError(
                instruccionesAPI.errorSemantico(
                  "No se puede aumentar/disminuir a una variable de tipo " +
                    value.tipo,
                  this.fila,
                  this.column
                )
              );
              return new val(
                this.line,
                this.column,
                Tipo.ERROR,
                "(ERROR SEMANTICO) No se puede aumentar/disminuir a una variable de tipo " +
                  value.tipo
              );
            }
        }
        else{
            arbolIns.setError(
              instruccionesAPI.errorSemantico(
                "La variable no existe osea no ha sido declarada " +
                  this.id,
                this.line,
                this.column
              )
            );
            return new val(
              this.line,
              this.column,
              Tipo.ERROR,
              "(ERROR SEMANTICO) La variable no existe osea no ha sido declarada " +
                this.id
            );
        }
    }
}
exports.IncreoDecre = IncreoDecre;
