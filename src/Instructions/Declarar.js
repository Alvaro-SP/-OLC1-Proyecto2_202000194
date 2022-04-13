"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declarar = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
class declarar {
    constructor(tipo, variable, valor, fila, column) {
        this.tipo = tipo;
        this.variable = variable;
        this.valor = valor;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns, table) {
        let valortemp = this.valor.ejecutar(arbolIns, table);
        var value = valortemp;
        //! Primero verifico de que no de ningun tipo de errores la EJECUCION
        if (value.valor != Tipo(tipo.ERROR)) {
            if(this.valor.tipo != this.tipo){
                if (this.tipo == Tipo(tipo.DOUBLE) &&(this.valor.tipo == Tipo(tipo.DOUBLE) || this.valor.tipo == Tipo(tipo.INT))) {
                    this.valor.tipo = Tipo(tipo.DOUBLE);
                } else {
                  const error = new Excepcion_1.Excepcion(
                    "Semantico",
                    `La variable no puede ser declarada debido a que son de diferentes tipos`,
                    this.line,
                    this.column
                  );
                  tree.excepciones.push(error);
                  tree.consola.push(error.toString());
                  return error;
                }
            }
            //! si no hay una expresion es decir que se DECLARA una variable
            //! sin ningun tipo de valor.
            if (this.valor == null) {
                if (this.tipo == Tipo(tipo.INT)) {
                  this.valor = new val(
                    this.fila,
                    this.column,
                    Tipo(tipo.INT),
                    0
                  );
                } else if (this.tipo == Tipo(tipo.DOUBLE)) {
                  this.valor = new val(
                    this.fila,
                    this.column,
                    Tipo(tipo.DOUBLE),
                    0.0
                  );
                } else if (this.tipo == Tipo(tipo.BOOLEAN)) {
                  this.valor = new val(
                    this.fila,
                    this.column,
                    Tipo(tipo.BOOLEAN),
                    true
                  );
                } else if (this.tipo == Tipo(tipo.CARACTER)) {
                  this.valor = new val(
                    this.fila,
                    this.column,
                    Tipo(tipo.CARACTER),
                    ""
                  );
                } else if (this.tipo == Tipo(tipo.STRING)) {
                  this.valor = new val(
                    this.fila,
                    this.column,
                    Tipo(tipo.STRING),
                    ""
                  );
                }
            }
            //! Ahora sino entonces simplemente voy a agregar un valor por defecto.
            else {

            }
        }
    }
}
exports.declarar = declarar;
