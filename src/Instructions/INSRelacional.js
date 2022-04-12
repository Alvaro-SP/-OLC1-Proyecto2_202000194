"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relacional = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
//! 5.6 Operadores Relacionales
// *Son los símbolos que tienen como finalidad comparar expresiones, dando como resultado
// *valores booleanos.
class relacional {
  constructor(expDer, expIzq, tipo, fila, column) {
    this.expDer = expDer;
    this.expIzq = expIzq;
    this.tipo = tipo;
    this.fila = fila;
    this.column = column;
  }
  ejecutar(arbolIns, table) {
    let valortemp = this.expDer.ejecutar(arbolIns, table);
    let valortemp2 = this.expIzq.ejecutar(arbolIns, table);
    var value = valortemp;
    var value2 = valortemp2;
    /*Operaciones como cadena-carácter, es error semántico, a menos que se utilice
    toString en el carácter.
    */
    //! **********************     SI ES UNA IGUAL:  ***********************************
    if (this.tipo === "IGUAL") {
      if (value.tipo == Tipo(tipo.INT)) {
        //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor == value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor == value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor == value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor == value2.valor.charCodeAt(0)
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.DOUBLE)) {
        //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor == value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor == value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor == value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> DOUBLE
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor == value2.valor.charCodeAt(0)
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.BOOLEAN)) {
        //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor == value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor == value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO

          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor == value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value2.charCodeAt(0) == value.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.CARACTER)) {
        //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.INT),
              value.valor.charCodeAt(0) == value2.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.INT), true);
          }
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value2.valor == value.valor.charCodeAt(0)
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO

          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor == value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> CADENA
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor == value2.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else {
        arbolIns.setError(
          instruccionesAPI.errorSemantico(
            "No se puede igualar los tipos " + value.tipo + " y " + value2.tipo,
            this.fila,
            this.column
          )
        );
        return new val(
          this.fila,
          this.column,
          Tipo(tipo.ERROR),
          "(ERROR SEMANTICO) No se puede igualar los tipos " +
            value.tipo +
            " y " +
            value2.tipo
        );
      }
      //! **********************     SI ES UNA NEGACION:  ***********************************
    } else if (this.tipo === "NEGACION") {
      if (value.tipo == Tipo(tipo.INT)) {
        //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor != value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor != value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor != value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor != value2.valor.charCodeAt(0)
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.DOUBLE)) {
        //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor != value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor != value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor != value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> DOUBLE
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor != value2.valor.charCodeAt(0)
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.BOOLEAN)) {
        //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor != value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor != value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO

          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor != value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value2.charCodeAt(0) != value.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.CARACTER)) {
        //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.INT),
              value.valor.charCodeAt(0) != value2.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.INT), true);
          }
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value2.valor != value.valor.charCodeAt(0)
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO

          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor != value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> CADENA
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor != value2.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else {
        arbolIns.setError(
          instruccionesAPI.errorSemantico(
            "No se puede comparar los tipos " +
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
          Tipo(tipo.ERROR),
          "(ERROR SEMANTICO) No se puede comparar los tipos " +
            value.tipo +
            " y " +
            value2.tipo
        );
      }
      //! **********************     SI ES MAYOR A:  ***********************************
    } else if (this.tipo === "MAYOR") {
      if (value.tipo == Tipo(tipo.INT)) {
        //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor > value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor > value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor > value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor > value2.valor.charCodeAt(0)
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.DOUBLE)) {
        //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor > value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor > value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor > value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> DOUBLE
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor > value2.valor.charCodeAt(0)
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.BOOLEAN)) {
        //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor > value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor > value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO

          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor > value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value2.charCodeAt(0) > value.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.CARACTER)) {
        //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor.charCodeAt(0) > value2.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.INT), true);
          }
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value2.valor > value.valor.charCodeAt(0)
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO

          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor > value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> CADENA
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor > value2.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else {
        arbolIns.setError(
          instruccionesAPI.errorSemantico(
            "No se puede igualar los tipos " + value.tipo + " y " + value2.tipo,
            this.fila,
            this.column
          )
        );
        return new val(
          this.fila,
          this.column,
          Tipo(tipo.ERROR),
          "(ERROR SEMANTICO) No se puede igualar los tipos " +
            value.tipo +
            " y " +
            value2.tipo
        );
      }
      //! **********************     SI ES MAYOR O IGUAL A:  ***********************************
    } else if (this.ttipoipo === "MAYORIGUAL") {
      if (value.tipo == Tipo(tipo.INT)) {
        //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor >= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor >= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor >= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor >= value2.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.DOUBLE)) {
        //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor >= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor >= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor >= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> DOUBLE
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor >= value2.valor.charCodeAt(0)
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.BOOLEAN)) {
        //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor >= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor >= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO

          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor >= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value2.charCodeAt(0) >= value.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.CARACTER)) {
        //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor.charCodeAt(0) >= value2.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.INT), true);
          }
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value2.valor >= value.valor.charCodeAt(0)
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO

          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor >= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> CADENA
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor >= value2.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else {
        arbolIns.setError(
          instruccionesAPI.errorSemantico(
            "No se puede comparar los tipos " +
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
          Tipo(tipo.ERROR),
          "(ERROR SEMANTICO) No se puede comparar los tipos " +
            value.tipo +
            " y " +
            value2.tipo
        );
      }
      //! **********************     SI ES MENOR A:  ***********************************
    } else if (this.tipo === "MENOR") {
      if (value.tipo == Tipo(tipo.INT)) {
        //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor < value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor < value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor < value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor < value2.valor.charCodeAt(0)
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.DOUBLE)) {
        //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor < value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor < value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor < value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> DOUBLE
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor < value2.valor.charCodeAt(0)
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.BOOLEAN)) {
        //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor < value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor < value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO

          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor < value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value2.charCodeAt(0) < value.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.CARACTER)) {
        //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor.charCodeAt(0) < value2.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.INT), true);
          }
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value2.valor < value.valor.charCodeAt(0)
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO

          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor < value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> CADENA
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor < value2.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else {
        arbolIns.setError(
          instruccionesAPI.errorSemantico(
            "No se puede comparar los tipos " +
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
          Tipo(tipo.ERROR),
          "(ERROR SEMANTICO) No se puede comparar los tipos " +
            value.tipo +
            " y " +
            value2.tipo
        );
      }
      //! **********************     SI ES MANOR O IGUAL A:  ***********************************
    } else if (this.tipo === "MENORIGUAL") {
      if (value.tipo == Tipo(tipo.INT)) {
        //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor == value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor <= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor <= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor <= value2.valor.charCodeAt(0)
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se comparar igualar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.DOUBLE)) {
        //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor <= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor <= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor <= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> DOUBLE
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor <= value2.valor.charCodeAt(0)
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.BOOLEAN)) {
        //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor <= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor <= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO

          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor <= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value2.charCodeAt(0) <= value.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else if (value.tipo == Tipo(tipo.CARACTER)) {
        //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
        if (value2.tipo == Tipo(tipo.INT)) {
          //? ENTERO -----> ENTERO
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor.charCodeAt(0) <= value2.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.INT), true);
          }
        } else if (value2.tipo == Tipo(tipo.DOUBLE)) {
          //? DOUBLE -----> DOUBLE
          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value2.valor <= value.valor.charCodeAt(0)
          );
        } else if (value2.tipo == Tipo(tipo.BOOLEAN)) {
          //? BOOLEAN -----> ENTERO

          return new val(
            this.fila,
            this.column,
            Tipo(tipo.BOOLEAN),
            value.valor <= value2.valor
          );
        } else if (value2.tipo == Tipo(tipo.CARACTER)) {
          //? CARACTER -----> CADENA
          try {
            return new val(
              this.fila,
              this.column,
              Tipo(tipo.BOOLEAN),
              value.valor <= value2.valor
            );
          } catch (error) {
            return new val(this.fila, this.column, Tipo(tipo.BOOLEAN), true);
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
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
            Tipo(tipo.ERROR),
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              value.tipo +
              " y " +
              value2.tipo
          );
        }
      } else {
        arbolIns.setError(
          instruccionesAPI.errorSemantico(
            "No se puede comparar los tipos " +
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
          Tipo(tipo.ERROR),
          "(ERROR SEMANTICO) No se puede comparar los tipos " +
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
        Tipo(tipo.ERROR),
        "(ERROR SEMANTICO) Operador Invalido, revise que exista o que los tipos coincidan " +
          value.tipo +
          " y " +
          value2.tipo
      );
    }
  }
}
exports.relacional = relacional;
