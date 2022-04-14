
"use strict"
Object.defineProperty(exports, "__esModule", { value: true });
exports.castear = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");

class castear {
  constructor(tipo, valor, fila, columna) {
    this.tipo = tipo;
    this.valor = valor; //le envio como padre un nulo de primero.
    this.fila = fila;
    this.columna = columna;
  }
  ejecutar(arbolIns, table){
    if(this.valor!= null){
      let valortemp = this.valor.ejecutar(arbolIns, table);
      var value = valortemp;

      //* El lenguaje aceptará los siguientes casteos:
        //? • Int a double
        //? • Int a String
        //? • Int a Char
      if (value.tipo === Tipo(tipo.INT)) {
        if (this.tipo.tipo === Tipo(tipo.DOUBLE)) {
          return value.valor;
        } else if (this.tipo === Tipo(tipo.STRING)) {
          return value.valor.toString();
        } else if (this.tipo === Tipo(tipo.CARACTER)) {
          return String.fromCharCode(value.valor);
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede CASTEAR el tipo de expresion " +
                value.tipo +
                " con valor: " +
                value.valor,
              this.fila,
              this.column
            )
          );
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.ERROR),
            "No se puede CASTEAR el tipo de expresion " +
              value.tipo +
              " con valor: " +
              value.valor
          );
        }
      } //? • Double a Int
        //? • Double a String
      else if (value.tipo === Tipo(tipo.DOUBLE)) {
        if (this.tipo.tipo === Tipo(tipo.INT)) {
          return Math.trunc(value.valor);
        } else if (this.tipo.tipo === Tipo(tipo.STRING)) {
          return value.valor.toString();
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede CASTEAR el tipo de expresion " +
                value.tipo +
                " con valor: " +
                value.valor,
              this.fila,
              this.column
            )
          );
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.ERROR),
            "No se puede CASTEAR el tipo de expresion " +
              value.tipo +
              " con valor: " +
              value.valor
          );
        }
      } //? • Char a int
      //? • Char a double
      else if (value.tipo === Tipo(tipo.CARACTER)) {
        if (this.tipo.tipo === Tipo(tipo.INT)) {
          return resultado.charCodeAt(0);
        } else if (this.tipo.tipo === Tipo(tipo.DOUBLE)) {
          return resultado.charCodeAt(0);
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede CASTEAR el tipo de expresion " +value.tipo+ " con valor: " + value.valor,
              this.fila,
              this.column
            )
          );
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.ERROR),
            "No se puede CASTEAR el tipo de expresion "+value.tipo+ " con valor: "+ value.valor
          );
        }
      }
    }
  }
}

exports.castear = castear;