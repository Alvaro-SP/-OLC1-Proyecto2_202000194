"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declarar = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const Simbolos = require("./simbolo/Simbolo");
const Tablita = require("./TS/TablaSimbolos");
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
      // !Primero valido de que la variable sea una lista o no?
      if(this.variable instanceof Array){
        //si es una lista de variables voy a asignarlas normalmente recorriendolas:
        for (let i = 0; i < this.variable.length; i++) {
          if (this.valor.valor != null) {
            let valortemp = this.valor.ejecutar(arbolIns, table);
            var value = valortemp;
            //! Primero verifico de que no de ningun tipo de errores la EJECUCION
            if (value.valor != Tipo(tipo.ERROR)) {
              //! si o si el tipo del valor debe ser igual al tipo del la ejecucion.
              if (this.valor.tipo != this.tipo) {
                //! verifico si el tipo del valor es un double o entero y es del mismo tipo que el tipo de la declaracion
                if (
                  this.tipo == Tipo(tipo.DOUBLE) &&
                  (this.valor.tipo == Tipo(tipo.DOUBLE) ||
                    this.valor.tipo == Tipo(tipo.INT))
                ) {
                  this.valor.tipo = Tipo(tipo.DOUBLE); // por defecto asigno el double
                } //! ahora sino, asigno ERROR SEMANTICO
                else {
                  arbolIns.setError(
                    instruccionesAPI.errorSemantico(
                      "No se puede Declarar la variable (tipo incompatible), de tipo " +
                        value.tipo,
                      this.fila,
                      this.column
                    )
                  );
                  return new val(
                    this.fila,
                    this.column,
                    Tipo(tipo.ERROR),
                    "No se puede Declarar la variable (tipo incompatible), de tipo  " +
                      value.tipo
                  );
                }
              }
              //! como tengo una variable por declarar me compete agregarla a la tabla de simbolos
              //! la agrego como un objeto simbolo
              var simbolo = new Simbolos.Simbolo(
                this.variable[i],
                value,
                this.tipo,
                this.line,
                this.column
              );
              var respuesta = Tablita.symbolTable.insertar(simbolo);
              arbolIns.setVariables(simbolo);
            }
          }
          else {
            //! si no hay una expresion ENTONCES se DECLARA una variable
            //! sin ningun tipo de valor  (VALORES POR DEFECTO).
            if (this.valor.valor == null) {
              if (this.tipo == Tipo(tipo.INT)) {
                this.valor.valor = new val(
                  this.fila,
                  this.column,
                  Tipo(tipo.INT),
                  0
                );
              } else if (this.tipo == Tipo(tipo.DOUBLE)) {
                this.valor.valor = new val(
                  this.fila,
                  this.column,
                  Tipo(tipo.DOUBLE),
                  0.0
                );
              } else if (this.tipo == Tipo(tipo.BOOLEAN)) {
                this.valor.valor = new val(
                  this.fila,
                  this.column,
                  Tipo(tipo.BOOLEAN),
                  true
                );
              } else if (this.tipo == Tipo(tipo.CARACTER)) {
                this.valor.valor = new val(
                  this.fila,
                  this.column,
                  Tipo(tipo.CARACTER),
                  ""
                );
              } else if (this.tipo == Tipo(tipo.STRING)) {
                this.valor.valor = new val(
                  this.fila,
                  this.column,
                  Tipo(tipo.STRING),
                  ""
                );
              }
            }
            //! como tengo una variable por declarar me compete agregarla a la tabla de simbolos
            //! la agrego como un objeto simbolo
            var simbolo = new Simbolos.Simbolo(
              this.variable,
              value,
              this.tipo,
              this.line,
              this.column
            );
            var respuesta = Tablita.symbolTable.insertar(simbolo);
            arbolIns.setVariables(simbolo);
          }
        }
      }
      else{
        //! sino entonces voy a agregar variables normales.
        if(this.valor.valor != null){
          let valortemp = this.valor.ejecutar(arbolIns, table);
          var value = valortemp;
          //! Primero verifico de que no de ningun tipo de errores la EJECUCION
          if (value.valor != Tipo(tipo.ERROR)) {
            //! si o si el tipo del valor debe ser igual al tipo del la ejecucion.
            if (this.valor.tipo != this.tipo) {
              //! verifico si el tipo del valor es un double o entero y es del mismo tipo que el tipo de la declaracion
              if (
                this.tipo == Tipo(tipo.DOUBLE) &&
                (this.valor.tipo == Tipo(tipo.DOUBLE) ||
                  this.valor.tipo == Tipo(tipo.INT))
              ) {
                this.valor.tipo = Tipo(tipo.DOUBLE); // por defecto asigno el double
              } //! ahora sino, asigno ERROR SEMANTICO
              else {
                arbolIns.setError(
                  instruccionesAPI.errorSemantico(
                    "No se puede Declarar la variable (tipo incompatible), de tipo " +
                      value.tipo,
                    this.fila,
                    this.column
                  )
                );
                return new val(
                  this.fila,
                  this.column,
                  Tipo(tipo.ERROR),
                  "No se puede Declarar la variable (tipo incompatible), de tipo  " +
                    value.tipo
                );
              }
            }
            //! como tengo una variable por declarar me compete agregarla a la tabla de simbolos
            //! la agrego como un objeto simbolo
            var simbolo = new Simbolos.Simbolo(
              this.variable[i],
              value,
              this.tipo,
              this.line,
              this.column
            );
            var respuesta = Tablita.symbolTable.insertar(simbolo);
            arbolIns.setVariables(simbolo);
          }
        }
        else{
          //! si no hay una expresion ENTONCES se DECLARA una variable
          //! sin ningun tipo de valor  (VALORES POR DEFECTO).
          if (this.valor.valor == null) {
            if (this.tipo == Tipo(tipo.INT)) {
              this.valor.valor = new val(
                this.fila,
                this.column,
                Tipo(tipo.INT),
                0
              );
            } else if (this.tipo == Tipo(tipo.DOUBLE)) {
              this.valor.valor = new val(
                this.fila,
                this.column,
                Tipo(tipo.DOUBLE),
                0.0
              );
            } else if (this.tipo == Tipo(tipo.BOOLEAN)) {
              this.valor.valor = new val(
                this.fila,
                this.column,
                Tipo(tipo.BOOLEAN),
                true
              );
            } else if (this.tipo == Tipo(tipo.CARACTER)) {
              this.valor.valor = new val(
                this.fila,
                this.column,
                Tipo(tipo.CARACTER),
                ""
              );
            } else if (this.tipo == Tipo(tipo.STRING)) {
              this.valor.valor = new val(
                this.fila,
                this.column,
                Tipo(tipo.STRING),
                ""
              );
            }
          }
          //! como tengo una variable por declarar me compete agregarla a la tabla de simbolos
          //! la agrego como un objeto simbolo
          var simbolo = new Simbolos.Simbolo(
            this.variable[i],
            value,
            this.tipo,
            this.line,
            this.column
          );
          var respuesta = Tablita.symbolTable.insertar(simbolo);
          arbolIns.setVariables(simbolo);
        }
      }
    }
}
exports.declarar = declarar;
