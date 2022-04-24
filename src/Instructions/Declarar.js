"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declarar = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const Simbolo = require("./simbolo/Simbolo");
const Tablita = require("./TS/TablaSimbolos");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.12 Declaración y asignación de variables▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class Declarar {
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
            if (value.valor != Tipo.ERROR) {
              //! si o si el tipo del valor debe ser igual al tipo del la ejecucion.
              if (this.valor.tipo != this.tipo) {
                //! verifico si el tipo del valor es un double o entero y es del mismo tipo que el tipo de la declaracion
                if (this.tipo == Tipo.DOUBLE &&(this.valor.tipo == Tipo.DOUBLE ||this.valor.tipo == Tipo.INT)) {
                  this.valor.tipo = Tipo.DOUBLE; // por defecto asigno el double
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
                  return new val.val(
                    this.fila,
                    this.column,
                    Tipo.ERROR,
                    "No se puede Declarar la variable (tipo incompatible), de tipo  " +
                      value.tipo
                  );
                }
              }
              //! como tengo una variable por declarar me compete agregarla a la tabla de simbolos
              //! la agrego como un objeto simbolo
              var simbolo = new Simbolo(
                this.variable,
                value,
                this.tipo,
                this.fila,
                this.column
              );
              console.log("variable declarada: " + simbolo.nombre);
              var respuesta = table.insertar(simbolo);
              arbolIns.setVariables(simbolo);
            }
          }
          else {
            //! si no hay una expresion ENTONCES se DECLARA una variable
            //! sin ningun tipo de valor  (VALORES POR DEFECTO).
            if (this.valor.valor == null) {
              if (this.tipo == Tipo.INT) {
                this.valor.valor = new val.val(
                  this.fila,
                  this.column,
                  Tipo.INT,
                  0
                );
              } else if (this.tipo == Tipo.DOUBLE) {
                this.valor.valor = new val.val(
                  this.fila,
                  this.column,
                  Tipo.DOUBLE,
                  0.0
                );
              } else if (this.tipo == Tipo.BOOLEAN) {
                this.valor.valor = new val.val(
                  this.fila,
                  this.column,
                  Tipo.BOOLEAN,
                  true
                );
              } else if (this.tipo == Tipo.CARACTER) {
                this.valor.valor = new val.val(
                  this.fila,
                  this.column,
                  Tipo.CARACTER,
                  ""
                );
              } else if (this.tipo == Tipo.STRING) {
                this.valor.valor = new val.val(
                  this.fila,
                  this.column,
                  Tipo.STRING,
                  ""
                );
              }
            }
            //! como tengo una variable por declarar me compete agregarla a la tabla de simbolos
            //! la agrego como un objeto simbolo
            var simbolo = new Simbolo(
              this.variable,
              value,
              this.tipo,
              this.fila,
              this.column
            );
            var respuesta = table.insertar(simbolo);
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
          if (value != Tipo.ERROR) {
            //! si o si el tipo del valor debe ser igual al tipo del la ejecucion.
            if (this.valor.tipo.tipo != this.tipo.tipo) {
              //! verifico si el tipo del valor es un double o entero y es del mismo tipo que el tipo de la declaracion
              if (this.tipo == Tipo.DOUBLE &&(this.valor.tipo.tipo == Tipo.DOUBLE ||
                  this.valor.tipo.tipo == Tipo.INT)) {
                this.valor.tipo.tipo = Tipo.DOUBLE; // por defecto asigno el double
              } //! ahora sino, asigno ERROR SEMANTICO
              else {
                arbolIns.setError(
                  instruccionesAPI.errorSemantico(
                    "No se puede Declarar la variable (tipo incompatible), de tipo " +
                      value.tipo.tipo,
                    this.fila,
                    this.column
                  )
                );
                return new val.val(
                  this.fila,
                  this.column,
                  Tipo.ERROR,
                  "No se puede Declarar la variable (tipo incompatible), de tipo  " +
                    value.tipo.tipo
                );
              }
            }
            //! como tengo una variable por declarar me compete agregarla a la tabla de simbolos
            //! la agrego como un objeto simbolo
            var simbolo = new Simbolo(this.variable,value,Tipo.VARIABLE,this.fila,this.column);
            var respuesta = table.insertar(simbolo);
            arbolIns.setVariables(simbolo);
          }
        }
        else{
          //! si no hay una expresion ENTONCES se DECLARA una variable
          //! sin ningun tipo de valor  (VALORES POR DEFECTO).
          if (this.valor.valor == null) {
            if (this.tipo == Tipo.INT) {
              this.valor.valor = new val.val(
                this.fila,
                this.column,
                Tipo.INT,
                0
              );
            } else if (this.tipo == Tipo.DOUBLE) {
              this.valor.valor = new val.val(
                this.fila,
                this.column,
                Tipo.DOUBLE,
                0.0
              );
            } else if (this.tipo == Tipo.BOOLEAN) {
              this.valor.valor = new val.val(
                this.fila,
                this.column,
                Tipo.BOOLEAN,
                true
              );
            } else if (this.tipo == Tipo.CARACTER) {
              this.valor.valor = new val.val(
                this.fila,
                this.column,
                Tipo.CARACTER,
                ""
              );
            } else if (this.tipo == Tipo.STRING) {
              this.valor.valor = new val.val(
                this.fila,
                this.column,
                Tipo.STRING,
                ""
              );
            }
          }
          //! como tengo una variable por declarar me compete agregarla a la tabla de simbolos
          //! la agrego como un objeto simbolo
          var simbolo = new Simbolo(
            this.variable,
            value,
            this.tipo,
            this.fila,
            this.column
          );
          var respuesta = table.insertar(simbolo);
          arbolIns.setVariables(simbolo);
        }
      }
    }
}
exports.Declarar = Declarar;
