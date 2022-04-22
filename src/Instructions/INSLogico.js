"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logico = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
//! 5.8 Operadores Lógicos
// *Son los símbolos que tienen como finalidad comparar expresiones a nivel 
// *lógico (verdadero o falso). 
class logico {
  constructor(expDer, expIzq, tipo, fila, column) {
    this.expDer = expDer;
    this.expIzq = expIzq;
    this.tipo = tipo;
    this.fila = fila;
    this.column = column;
  }
  ejecutar(arbolIns, table) {

    if(this.expDer===null){
        let valortemp = this.expIzq.ejecutar(arbolIns, table);
        var value = valortemp;
        if (this.tipo == "NOT") {
          // ? si mi operador es de tipo BOOLEANO entonces si podre operar sino error.
          if (value.tipo == Tipo.BOOLEAN) {
            return new val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor || value2.valor
            );
          } else {
            arbolIns.setError(
              instruccionesAPI.errorSemantico(
                "No se puede operar ! el tipo de Operador " + value.tipo,
                this.fila,
                this.column
              )
            );
            return new val(
              this.fila,
              this.column,
              Tipo.ERROR,
              "(ERROR SEMANTICO) No se puede operar ! el tipo de Operador " +
                value.tipo +
                " y " +
                value2.tipo
            );
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede operar ! el tipo de Operador " + value.tipo,
              this.fila,
              this.column
            )
          );
          return new val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede operar ! el tipo de Operador " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
    }
    if(this.expDer!==null){
        let valortemp = this.expDer.ejecutar(arbolIns, table);
        let valortemp2 = this.expIzq.ejecutar(arbolIns, table);
        var value = valortemp;  
        var value2 = valortemp2;
        if (value.tipo != Tipo.ERROR && value2.tipo != Tipo.ERROR) {
          //! **********************     SI ES UN AND:  ***********************************
          if (this.tipo == "AND") {
            if (
              value.tipo == Tipo.BOOLEAN &&
              value2.tipo == Tipo.BOOLEAN
            ) {
              return value.valor && value2.valor;
            } else {
              arbolIns.setError(
                instruccionesAPI.errorSemantico(
                  "&& (AND) No se puede operar los tipos " +
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
                "&& (ERROR SEMANTICO) No se puede operar los tipos " +
                  value.tipo +
                  " y " +
                  value2.tipo
              );
            }
          }
          //! **********************     SI ES UN OR:  ***********************************
          else if (this.tipo == "OR") {
            if (
              value.tipo == Tipo.BOOLEAN &&
              value2.tipo == Tipo.BOOLEAN
            ) {
              return value.valor || value2.valor;
            } else {
              arbolIns.setError(
                instruccionesAPI.errorSemantico(
                  " || (OR) No se puede operar los tipos " +
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
                " || (ERROR SEMANTICO) No se puede operar los tipos " +
                  value.tipo +
                  " y " +
                  value2.tipo
              );
            }
          } else {
            arbolIns.setError(
              instruccionesAPI.errorSemantico(
                "Operador Invalido, revise que exista o que los tipos coincidan " +
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
              "(ERROR SEMANTICO) Operador Invalido, revise que exista o que los tipos coincidan " +
                value.tipo +
                " y " +
                value2.tipo
            );
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "Ya sea que los tipos de las expresiones sean NULAS " +
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
            "(ERROR SEMANTICO) Operadores alguna es nula o invalida para operar, verifique eso. " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
    }
  }
}
exports.logico = logico;
