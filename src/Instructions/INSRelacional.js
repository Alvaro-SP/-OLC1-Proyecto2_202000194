"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSRelacional = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.6 Operadores Relacionales▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// *Son los símbolos que tienen como finalidad comparar expresiones, dando como resultado
// *valores booleanos.
class INSRelacional extends nodo.nodo {
  constructor(expDer, expIzq, op, fila, column) {
    super(Tipo.BOOLEAN);
    this.expDer = expDer;
    this.expIzq = expIzq;
    this.op = op;
    this.fila = fila;
    this.column = column;
  }
  ejecutar(arbolIns, table) {
    let valortemp = this.expDer.ejecutar(arbolIns, table);
    let valortemp2 = this.expIzq.ejecutar(arbolIns, table);
    // console.log("*************valores a relacionar con INSRELACIONAL****************: ")
    // console.log('this.expIzq')
    // console.log(this.expIzq)
    // console.log('this.expIzq VALOR OBTENIDO:')
    // console.log(valortemp2)
    // console.log('this.expDer')
    // console.log(this.expDer)
    // console.log('this.expDer VALOR OBTENIDO:')
    // console.log(valortemp)
    // console.log("*************************fin relacional*************************")
    // var value = valortemp;
    // var value2 = valortemp2;
    /*Operaciones como cadena-carácter, es error semántico, a menos que se utilice
    toString en el carácter.
    */
    var value = new val.val(0, 0, 0, valortemp);
    var value2 = new val.val(0, 0, 0, valortemp2);
    //! **********************     SI ES UNA IGUAL:  ***********************************
    if (this.op == 'IGUAL') {
      // this.op= Tipo.BOOLEAN
      if (this.expDer.tipo == Tipo.INT) {
        //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          var temp=new val.val(this.fila,this.column,Tipo.BOOLEAN,value.valor === value2.valor);
          // console.log("ESTE ES EL VALOR QUE BUSCO:")
          // console.log(temp.valor)
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor == value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor == value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor == value2.valor.charCodeAt(0)
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.DOUBLE) {
        //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor == value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor == value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor == value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> DOUBLE
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor == value2.valor.charCodeAt(0)
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.BOOLEAN) {
        //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor == value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor == value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO

          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor === value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value2.charCodeAt(0) == value.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.CARACTER) {
        //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.INT,
              value.valor.charCodeAt(0) == value2.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.INT, true);
            return temp.valor
          }
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value2.valor == value.valor.charCodeAt(0)
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO

          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor == value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> CADENA
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor == value2.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else {
        arbolIns.setError(
          instruccionesAPI.errorSemantico(
            "No se puede igualar los tipos " + this.expDer.tipo + " y " + this.expIzq.tipo,
            this.fila,
            this.column
          )
        );
        return new val.val(
          this.fila,
          this.column,
          Tipo.ERROR,
          "(ERROR SEMANTICO) No se puede igualar los tipos " +
            this.expDer.tipo +
            " y " +
            this.expIzq.tipo
        );
      }
      //! **********************     SI ES UNA NEGACION:  ***********************************
    } else if (this.op == 'NEGACION') {
      // this.op= Tipo.BOOLEAN
      if (this.expDer.tipo == Tipo.INT) {
        //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor != value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor != value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor != value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor != value2.valor.charCodeAt(0)
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.DOUBLE) {
        //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor != value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor != value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor != value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> DOUBLE
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor != value2.valor.charCodeAt(0)
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.BOOLEAN) {
        //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor != value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor != value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO

          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor != value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value2.charCodeAt(0) != value.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.CARACTER) {
        //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.INT,
              value.valor.charCodeAt(0) != value2.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.INT, true);
            return temp.valor
          }
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value2.valor != value.valor.charCodeAt(0)
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO

          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor != value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> CADENA
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor != value2.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else {
        arbolIns.setError(
          instruccionesAPI.errorSemantico(
            "No se puede comparar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo,
            this.fila,
            this.column
          )
        );
        return new val.val(
          this.fila,
          this.column,
          Tipo.ERROR,
          "(ERROR SEMANTICO) No se puede comparar los tipos " +
            this.expDer.tipo +
            " y " +
            this.expIzq
        );
      }
      //! **********************     SI ES MAYOR A:  ***********************************
    } else if (this.op == 'MAYOR') {
      // this.op= Tipo.BOOLEAN
      if (this.expDer.tipo == Tipo.INT) {
        //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor > value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor > value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor > value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor > value2.valor.charCodeAt(0)
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.DOUBLE) {
        //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor > value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor > value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor > value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> DOUBLE
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor > value2.valor.charCodeAt(0)
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.BOOLEAN) {
        //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor > value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor > value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO

          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor > value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value2.charCodeAt(0) > value.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.CARACTER) {
        //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor.charCodeAt(0) > value2.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.INT, true);
            return temp.valor
          }
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value2.valor > value.valor.charCodeAt(0)
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO

          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor > value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> CADENA
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor > value2.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else {
        arbolIns.setError(
          instruccionesAPI.errorSemantico(
            "No se puede igualar los tipos " + this.expDer.tipo + " y " + this.expIzq.tipo,
            this.fila,
            this.column
          )
        );
        return new val.val(
          this.fila,
          this.column,
          Tipo.ERROR,
          "(ERROR SEMANTICO) No se puede igualar los tipos " +
            this.expDer.tipo +
            " y " +
            this.expIzq.tipo
        );
      }
      //! **********************     SI ES MAYOR O IGUAL A:  ***********************************
    } else if (this.op == 'MAYORIGUAL') {
      // this.op= Tipo.BOOLEAN
      if (this.expDer.tipo == Tipo.INT) {
        //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor >= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor >= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor >= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor >= value2.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.DOUBLE) {
        //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor >= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor >= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor >= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> DOUBLE
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor >= value2.valor.charCodeAt(0)
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.BOOLEAN) {
        //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor >= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor >= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO

          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor >= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value2.charCodeAt(0) >= value.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.CARACTER) {
        //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor.charCodeAt(0) >= value2.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.INT, true);
            return temp.valor
          }
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value2.valor >= value.valor.charCodeAt(0)
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO

          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor >= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> CADENA
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor >= value2.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else {
        arbolIns.setError(
          instruccionesAPI.errorSemantico(
            "No se puede comparar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo,
            this.fila,
            this.column
          )
        );
        return new val.val(
          this.fila,
          this.column,
          Tipo.ERROR,
          "(ERROR SEMANTICO) No se puede comparar los tipos " +
            this.expDer.tipo +
            " y " +
            this.expIzq.tipo
        );
      }
      //! **********************     SI ES MENOR A:  ***********************************
    } else if (this.op == 'MENOR') {
      // this.op= Tipo.BOOLEAN
      if (this.expDer.tipo == Tipo.INT) {
        //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor < value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor < value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor < value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor < value2.valor.charCodeAt(0)
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.DOUBLE) {
        //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor < value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor < value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor < value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> DOUBLE
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor < value2.valor.charCodeAt(0)
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede igualar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede igualar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.BOOLEAN) {
        //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor < value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor < value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO

          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor < value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value2.charCodeAt(0) < value.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.CARACTER) {
        //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor.charCodeAt(0) < value2.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.INT, true);
            return temp.valor
          }
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value2.valor < value.valor.charCodeAt(0)
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO

          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor < value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> CADENA
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor < value2.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else {
        arbolIns.setError(
          instruccionesAPI.errorSemantico(
            "No se puede comparar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo,
            this.fila,
            this.column
          )
        );
        return new val.val(
          this.fila,
          this.column,
          Tipo.ERROR,
          "(ERROR SEMANTICO) No se puede comparar los tipos " +
            this.expDer.tipo +
            " y " +
            this.expIzq.tipo
        );
      }
      //! **********************     SI ES MANOR O IGUAL A:  ***********************************
    } else if (this.op == 'MENORIGUAL') {
      // this.op= Tipo.BOOLEAN
      if (this.expDer.tipo == Tipo.INT) {
        //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor == value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor <= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor <= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor <= value2.valor.charCodeAt(0)
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se comparar igualar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.DOUBLE) {
        //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor <= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor <= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor <= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> DOUBLE
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor <= value2.valor.charCodeAt(0)
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.BOOLEAN) {
        //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor <= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor <= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO

          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor <= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value2.charCodeAt(0) <= value.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else if (this.expDer.tipo == Tipo.CARACTER) {
        //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.expIzq.tipo == Tipo.INT) {
          //? ENTERO -----> ENTERO
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor.charCodeAt(0) <= value2.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.INT, true);
            return temp.valor
          }
        } else if (this.expIzq.tipo == Tipo.DOUBLE) {
          //? DOUBLE -----> DOUBLE
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value2.valor <= value.valor.charCodeAt(0)
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.BOOLEAN) {
          //? BOOLEAN -----> ENTERO

          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.BOOLEAN,
            value.valor <= value2.valor
          );
          return temp.valor
        } else if (this.expIzq.tipo == Tipo.CARACTER) {
          //? CARACTER -----> CADENA
          try {
            var temp=new val.val(
              this.fila,
              this.column,
              Tipo.BOOLEAN,
              value.valor <= value2.valor
            );
            return temp.valor
          } catch (error) {
            var temp=new val.val(this.fila, this.column, Tipo.BOOLEAN, true);
            return temp.valor
          }
        } else {
          arbolIns.setError(
            instruccionesAPI.errorSemantico(
              "No se puede comparar los tipos " +
                this.expDer.tipo +
                " y " +
                this.expIzq.tipo,
              this.fila,
              this.column
            )
          );
          var temp=new val.val(
            this.fila,
            this.column,
            Tipo.ERROR,
            "(ERROR SEMANTICO) No se puede comparar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo
          );
          return temp
        }
      } else {
        arbolIns.setError(
          instruccionesAPI.errorSemantico(
            "No se puede comparar los tipos " +
              this.expDer.tipo +
              " y " +
              this.expIzq.tipo,
            this.fila,
            this.column
          )
        );
        return new val.val(
          this.fila,
          this.column,
          Tipo.ERROR,
          "(ERROR SEMANTICO) No se puede comparar los tipos " +
            this.expDer.tipo +
            " y " +
            this.expIzq.tipo
        );
      }
    } else {
      arbolIns.setError(
        instruccionesAPI.errorSemantico(
          "Operador Invalido, revise que exista   "+this.op+"  o que los tipos coincidan " +
            this.expDer.tipo +" y " +this.expIzq.tipo,this.fila,this.column));
      return new val.val(this.fila,this.column,Tipo.ERROR,
        "(ERROR SEMANTICO) Operador Invalido, revise que exista o que los tipos coincidan " +
          this.expDer.tipo +" y " +this.expIzq.tipo);
    }
  }
}
exports.INSRelacional = INSRelacional;
