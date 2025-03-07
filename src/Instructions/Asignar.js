"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignar = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const Tablita = require("./TS/TablaSimbolos");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.12 Declaración y asignación de variables▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class Asignar extends nodo.nodo{
constructor(variable, valor, fila, column) {
    super(null)
    // this.tipo = tipo;
    this.variable = variable;
    this.valor = valor;
    this.fila = fila;
    this.column = column;
    // this.ambito = ambito;
}
// La diferencia en esta asignacion es de que necesito agregar el ambito de la variable que voy a agregar
// entonces necesito ese nuevo parametro al ejecutar 
ejecutar(arbolIns, table) {
    let valortemp = this.valor.ejecutar(arbolIns, table);
    var value = valortemp;
    // console.log("*********************** ASIGNACION***********************");
    // console.log(this.variable)
    //* si la variable es un array eso significa de que son varias asignaciones.
    if(this.variable instanceof Array){
        for (let i = 0; i < this.variable.length; i++) {
            //! Primero verifico de que no de ningun tipo de errores la EJECUCION
            if (value.valor != Tipo.ERROR) {
                //! Busco en mi lista Simbolos el valor para saber el tipo a asignar.
                var tipoasignar = table.getSimbol(this.variable[i]); // envio el nombre de la variable
                // console.log("variable de la TABLA:")
                // console.log(tipoasignar)
                if(tipoasignar==null ||tipoasignar.tipo==Tipo.ERROR ||tipoasignar==undefined) {
                    //*error semantico
                    arbolIns.setError(
                    instruccionesAPI.errorSemantico(
                        "La variable no ha sido declarada " + tipoasignar.tipo,
                        this.fila,
                        this.column
                    )
                    );
                    return new val.val(
                    this.fila,
                    this.column,
                    Tipo.ERROR,
                    "(ERROR SEMANTICO) La variable no ha sido declarada " +
                        tipoasignar.tipo
                    );
                }
                if (this.valor == null) {
                //! si el valor es nulo es porque no hay nada que asignar
                    //* si lo encontro entonces asigno su tipo correspondiente:
                    if (tipoasignar != null) {
                        //! procedo a agregar valores por defecto.
                        if (this.tipo == Tipo.INT) {
                            // new val.val(
                            //   this.fila,
                            //   this.column,
                            //   Tipo.INT,
                            //   0
                            // );
                            this.valor = new INSPrimitivos.INSPrimitivos(Tipo.INT, 0, this.fila,this.column)
                          } else if (this.tipo == Tipo.DOUBLE) {
                            // this.valor = new val.val(
                            //   this.fila,
                            //   this.column,
                            //   Tipo.DOUBLE,
                            //   0.0
                            // );
                            this.valor = new INSPrimitivos.INSPrimitivos(Tipo.DOUBLE, 0.00, this.fila,this.column)
                          } else if (this.tipo == Tipo.BOOLEAN) {
                            // this.valor = new val.val(
                            //   this.fila,
                            //   this.column,
                            //   Tipo.BOOLEAN,
                            //   true
                            // );
                            this.valor = new INSPrimitivos.INSPrimitivos(Tipo.BOOLEAN, true, this.fila,this.column)
                          } else if (this.tipo == Tipo.CARACTER) {
                            // this.valor = new val.val(
                            //   this.fila,
                            //   this.column,
                            //   Tipo.CARACTER,
                            //   ""
                            // );
                            this.valor = new INSPrimitivos.INSPrimitivos(Tipo.CARACTER, " ", this.fila,this.column)
                          } else if (this.tipo == Tipo.STRING) {
                            // this.valor = new val.val(
                            //   this.fila,
                            //   this.column,
                            //   Tipo.STRING,
                            //   ""
                            // );
                            this.valor = new INSPrimitivos.INSPrimitivos(Tipo.STRING, 0, this.fila,this.column)
                          }else{
                            this.tipo=Tipo.DOUBLE;
                            this.valor = new INSPrimitivos.INSPrimitivos(Tipo.DOUBLE, 0, this.fila,this.column)
              
                          }
                          value=this.valor
                        }
                    //* sino lo encontro enconces F
                    else {
                        //*error semantico
                        arbolIns.setError(
                        instruccionesAPI.errorSemantico(
                            "La variable no ha sido declarada " + tipoasignar.tipo,
                            this.fila,
                            this.column
                        )
                        );
                        return new val.val(
                        this.fila,
                        this.column,
                        Tipo.ERROR,
                        "(ERROR SEMANTICO) La variable no ha sido declarada " +
                            tipoasignar.tipo
                        );
                    }
                    //? y guardo el valor:
                    if (this.valor.tipo == tipoasignar.tipo) {
                        tipoasignar.data = value;
                        // table.modify(this.variable, value);

                        // console.log("variable asignada: " + tipoasignar.id+" con valor "+tipoasignar.data );
                    }
                } //! si el valor ahora no es nulo, entonces necesito guardar su valor
                else {
                    //? y guardo el valor:
                    // console.log(this.valor.tipo +'=='+ tipoasignar.tipo)
                    if (this.valor.tipo == tipoasignar.tipo) {
                        tipoasignar.data = value;
                        // table.modify(this.variable, value);

                        // console.log("variable asignada: " + tipoasignar.id+" con valor "+tipoasignar.data );
                    }
                }
            }

        }
    }//* sino entonces voy a asignar una variable normalmente.
    else{
      //! Primero verifico de que no de ningun tipo de errores la EJECUCION
        if (value!=undefined || value.valor != Tipo.ERROR) {
            //! Busco en mi lista Simbolos el valor para saber el tipo a asignar.
            // console.log("variable a buscar: " + this.variable)
            var tipoasignar = table.getSimbol(this.variable); // envio el nombre de la variable
            // console.log("variable de la TABLA:")
            // console.log(tipoasignar)
            if(tipoasignar==null ||tipoasignar.tipo==Tipo.ERROR ||tipoasignar==undefined) {
                //*error semantico
                arbolIns.setError(
                instruccionesAPI.errorSemantico(
                    "La variable no ha sido declarada " + tipoasignar.tipo,
                    this.fila,
                    this.column
                )
                );
                return new val.val(
                this.fila,
                this.column,
                Tipo.ERROR,
                "(ERROR SEMANTICO) La variable no ha sido declarada " +
                    tipoasignar.tipo
                );
            }

            if (this.valor == null) {
                //! si el valor es nulo es porque no hay nada que asignar
                //* si lo encontro entonces asigno su tipo correspondiente:
                if (tipoasignar != null || tipoasignar!=undefined) {
                    //! procedo a agregar valores por defecto.
                    if (this.tipo == Tipo.INT) {
                        // new val.val(
                        //   this.fila,
                        //   this.column,
                        //   Tipo.INT,
                        //   0
                        // );
                        this.valor = new INSPrimitivos.INSPrimitivos(Tipo.INT, 0, this.fila,this.column)
                    } else if (this.tipo == Tipo.DOUBLE) {
                    // this.valor = new val.val(
                    //   this.fila,
                    //   this.column,
                    //   Tipo.DOUBLE,
                    //   0.0
                    // );
                    this.valor = new INSPrimitivos.INSPrimitivos(Tipo.DOUBLE, 0.00, this.fila,this.column)
                    } else if (this.tipo == Tipo.BOOLEAN) {
                    // this.valor = new val.val(
                    //   this.fila,
                    //   this.column,
                    //   Tipo.BOOLEAN,
                    //   true
                    // );
                    this.valor = new INSPrimitivos.INSPrimitivos(Tipo.BOOLEAN, true, this.fila,this.column)
                    } else if (this.tipo == Tipo.CARACTER) {
                    // this.valor = new val.val(
                    //   this.fila,
                    //   this.column,
                    //   Tipo.CARACTER,
                    //   ""
                    // );
                    this.valor = new INSPrimitivos.INSPrimitivos(Tipo.CARACTER, " ", this.fila,this.column)
                    } else if (this.tipo == Tipo.STRING) {
                    // this.valor = new val.val(
                    //   this.fila,
                    //   this.column,
                    //   Tipo.STRING,
                    //   ""
                    // );
                    this.valor = new INSPrimitivos.INSPrimitivos(Tipo.STRING, 0, this.fila,this.column)
                    }else{
                    this.tipo=Tipo.DOUBLE;
                    this.valor = new INSPrimitivos.INSPrimitivos(Tipo.DOUBLE, 0, this.fila,this.column)
        
                    }
                }
                //* sino lo encontro enconces F
                else {
                    //*error semantico
                    arbolIns.setError(
                    instruccionesAPI.errorSemantico(
                        "La variable no ha sido declarada " + tipoasignar.tipo,
                        this.fila,
                        this.column
                    )
                    );
                    return new val.val(
                    this.fila,
                    this.column,
                    Tipo.ERROR,
                    "(ERROR SEMANTICO) La variable no ha sido declarada " +
                        tipoasignar.tipo
                    );
                }
                // //? y guardo el valor:
                // if (this.valor.tipo == tipoasignar.tipo) {
                //     tipoasignar.data = value;
                // }
            }
            // else { //! si el valor ahora no es nulo, entonces necesito guardar su valor
            //         //? y guardo el valor:

            //         if (this.valor.tipo == tipoasignar.tipo) {
            //             tipoasignar.data = value;
            //             // console.log("variable asignada: " + tipoasignar.id+" con valor "+tipoasignar.data );
            //         }
            // }

            if (this.valor.tipo != tipoasignar.tipo) {
                if (tipoasignar.tipo.tipo == Tipo.DOUBLE && (this.valor.tipo == Tipo.DOUBLE || this.valor.tipo == Tipo.INT)) {
                    this.valor.tipo = Tipo.DOUBLE;
                }
                else {
                    //*error semantico
                    arbolIns.setError(
                        instruccionesAPI.errorSemantico(
                            "La variable no ha sido declarada por ser de distintos tipos" + tipoasignar.tipo,
                            this.fila,
                            this.column
                        )
                        );
                        return new val.val(
                        this.fila,
                        this.column,
                        Tipo.ERROR,
                        "(ERROR SEMANTICO) La variable no ha sido declarada por ser de distintos tipos" +
                            tipoasignar.tipo
                        );
                }
            }
    
            var variableresultado = value;
            try {
                let variable;
                variable = table.getSimbol(this.valor.id);
                if (variable.t2 == Tipo.VECTOR) {
                    variableresultado = this.valor;
                }
            }
            catch (err) {
                variableresultado = value;
            }
            
            tipoasignar.data = variableresultado;
            table.modify(this.variable, variableresultado);





        }
        return null;
    }
    // console.log("*********************** FIN ASIGNACION ***********************");
}
}
exports.Asignar = Asignar;
