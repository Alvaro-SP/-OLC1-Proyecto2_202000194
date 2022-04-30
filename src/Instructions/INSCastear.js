
"use strict"
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSCastear = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");

class INSCastear extends nodo.nodo{
  constructor(tipo, valor, fila, column) {
    super(tipo);
    this.tipo = tipo;
    this.valor = valor; //le envio como padre un nulo de primero.
    this.fila = fila;
    this.column = column;
  }
  ejecutar(arbolIns, table){
    if(this.valor!= null){
      let valortemp = this.valor.ejecutar(arbolIns, table);
      var value = valortemp;
      // console.log("Este es el valor ejecutado de CASTEAR: ")
      // console.log(value)
      // console.log("y este es el valor a castear: ")
      // console.log(this.valor)

      //* El lenguaje aceptará los siguientes casteos:
        //? • Int a double
        //? • Int a String
        //? • Int a Char
      if (this.valor.tipo === Tipo.INT) {
        if (this.tipo.tipo === Tipo.DOUBLE) {
          return value;
        } else if (this.tipo.tipo === Tipo.STRING) {
          return value.toString();
        } else if (this.tipo.tipo === Tipo.CARACTER) {
          return String.fromCharCode(value);
        } else if (this.tipo.tipo === Tipo.INT) {
          return value;
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede CASTEAR el tipo de expresion " +
                this.valor.tipo +
                " con valor: " +
                value,
              this.fila,
              this.column
            )
          );
          arbolIns.console.push("No se puede CASTEAR el tipo de expresion " +
          this.valor.tipo +
          " con valor: " +
          value);
          return new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "No se puede CASTEAR el tipo de expresion " +
            this.valor.tipo +
              " con valor: " +
              value
          );
        }
      } //? • Double a Int
        //? • Double a String
      else if (this.valor.tipo === Tipo.DOUBLE) {
        if (this.tipo.tipo === Tipo.INT) {
          return Math.trunc(value);
        } else if (this.tipo.tipo === Tipo.STRING) {
          return value.toString();
        }  else if (this.tipo.tipo === Tipo.DOUBLE) {
          return value;
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede CASTEAR el tipo de expresion " +
                this.valor.tipo +
                " con valor: " +
                value,
              this.fila,
              this.column
            )
          );
          arbolIns.console.push("No se puede CASTEAR el tipo de expresion " +
          this.valor.tipo +
          " con valor: " +
          value);
          return new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "No se puede CASTEAR el tipo de expresion " +
              this.valor.tipo +
              " con valor: " +
              value
          );
        }
      } //? • Char a int
      //? • Char a double
      else if (this.valor.tipo === Tipo.CARACTER) {
        if (this.tipo.tipo === Tipo.INT) {
          return value.charCodeAt(0);
        } else if (this.tipo.tipo === Tipo.DOUBLE) {
          return value.charCodeAt(0);
        } else if (this.tipo.tipo === Tipo.CARACTER) {
          return value;
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede CASTEAR el tipo de expresion " +this.valor.tipo+ " con valor: " + value,
              this.fila,
              this.column
            )
          );
          arbolIns.console.push("No se puede CASTEAR el tipo de expresion "+this.valor.tipo+ " con valor: "+ value);
          return new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "No se puede CASTEAR el tipo de expresion "+this.valor.tipo+ " con valor: "+ value
          );
        }
      }else{
        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede CASTEAR los tipos (tipo incompatible)" +
        this.valor.tipo+ " con valor: " + value,this.fila,this.column));
        arbolIns.console.push("No se puede CASTEAR los tipos (tipo incompatible)" +this.valor.tipo+ " con valor: " + value);
        return new val.val(this.fila,this.column,Tipo.ERROR,
        "No se puede CASTEAR los tipos (tipo incompatible)" +this.valor.tipo+ " con valor: " + value);
      }
    }
  }
}

exports.INSCastear = INSCastear;