"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");

class INSincredecre extends nodo.nodo{
    constructor(id, op, fila, column) {
      super(null)
        this.id = id;
        this.op = op;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns, table) {
      // console.log("************* INCREMENT/DECREMENT****************: ")
        let value;
        value = table.getSimbol(this.id);
        // console.log('value:')
        // console.log(value)
        this.tipo = value.tipo;
        if (value != null) {
            if (value.tipo === Tipo.INT) {
              if (this.op === "INCREMENT") {
                value.data = value.data + 1;
                var temp= table.getSimbol(this.id)
                console.log(temp.data)
                return temp.data;
              } else if (this.op === "DECREMENT") {
                // this.tipo = value.tipo;
                value.data = value.data - 1;
                var temp= table.getSimbol(this.id)
                console.log(temp.data)
                return temp.data;
              } else {
                arbolIns.setError(
                  instruccionesAPI.errorSemantico(
                    "tipo Invalido, revise que exista o que los tipos coincidan " +
                      value.tipo ,
                    this.fila,
                    this.column
                  )
                );
                return new val.val(
                  this.fila,
                  this.column,
                  Tipo.ERROR,
                  "(ERROR SEMANTICO) tipo Invalido, revise que exista o que los tipos coincidan " +
                    value.tipo
                );
              }
            } else if (value.tipo === Tipo.DOUBLE) {
              if (this.op === "INCREMENT") {
                // this.tipo = value.tipo;
                value.data = value.data + 1;
                var tempvalue = table.getSimbol(this.id);
                console.log(tempvalue.data)
                return tempvalue.data;
              } else if (this.op === "DECREMENT") {
                // this.tipo = value.tipo;
                value.data = value.data - 1;
                var tempvalue = table.getSimbol(this.id);
                console.log(tempvalue.data)
                return tempvalue.data;
              } else {
                arbolIns.setError(
                  instruccionesAPI.errorSemantico(
                    "No se puede aumentar/disminuir a una variable de tipo " +
                      value.tipo,
                    this.fila,
                    this.column
                  )
                );
                return new val.val(
                  this.fila,
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
              return new val.val(
                this.fila,
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
                this.fila,
                this.column
              )
            );
            return new val.val(
              this.fila,
              this.column,
              Tipo.ERROR,
              "(ERROR SEMANTICO) La variable no existe osea no ha sido declarada " +
                this.id
            );
        }
    }
}
exports.INSincredecre = INSincredecre;
