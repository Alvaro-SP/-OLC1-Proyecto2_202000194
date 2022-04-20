"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asignar = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const Tablita = require("./TS/TablaSimbolos");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
class asignar {
constructor(variable, valor, ambito, fila, column) {
    // this.tipo = tipo;
    this.variable = variable;
    this.valor = valor;
    this.fila = fila;
    this.column = column;
    this.ambito = ambito;
}
// La diferencia en esta asignacion es de que necesito agregar el ambito de la variable que voy a agregar
// entonces necesito ese nuevo parametro al ejecutar 
ejecutar(arbolIns, table) {
    let valortemp = this.valor.ejecutar(arbolIns, table);
    var value = valortemp;
    //* si la variable es un array eso significa de que son varias asignaciones.
    if(this.variable instanceof Array){
        for (let i = 0; i < this.variable.length; i++) {
            
            //! Primero verifico de que no de ningun tipo de errores la EJECUCION
            if (value.valor != Tipo(tipo.ERROR)) {
                //! Busco en mi lista Simbolos el valor para saber el tipo a asignar.
                var tipoasignar = Tablita.TablaSimbolos().getSimbol(this.variable[i]); // envio el nombre de la variable

                if (this.valor == null) {
                //! si el valor es nulo es porque no hay nada que asignar
                //* si lo encontro entonces asigno su tipo correspondiente:
                if (tipoasignar != null) {
                    //! procedo a agregar valores por defecto.
                    if (tipoasignar.tipo == Tipo(tipo.INT)) {
                    this.valor = new val(this.fila, this.column, Tipo(tipo.INT), 0);
                    } else if (tipoasignar.tipo == Tipo(tipo.DOUBLE)) {
                    this.valor = new val(
                        this.fila,
                        this.column,
                        Tipo(tipo.DOUBLE),
                        0.0
                    );
                    } else if (tipoasignar.tipo == Tipo(tipo.BOOLEAN)) {
                    this.valor = new val(
                        this.fila,
                        this.column,
                        Tipo(tipo.BOOLEAN),
                        true
                    );
                    } else if (tipoasignar.tipo == Tipo(tipo.CARACTER)) {
                    this.valor = new val(
                        this.fila,
                        this.column,
                        Tipo(tipo.CARACTER),
                        ""
                    );
                    } else if (tipoasignar.tipo == Tipo(tipo.STRING)) {
                    this.valor = new val(
                        this.fila,
                        this.column,
                        Tipo(tipo.STRING),
                        ""
                    );
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
                    return new val(
                    this.fila,
                    this.column,
                    Tipo(tipo.ERROR),
                    "(ERROR SEMANTICO) La variable no ha sido declarada " +
                        tipoasignar.tipo
                    );
                }
                //? y guardo el valor:
                if (this.valor.tipo == tipoasignar.tipo) {
                    tipoasignar.data = value;
                }
                } //! si el valor ahora no es nulo, entonces necesito guardar su valor
                else {
                    //? y guardo el valor:
                    if (this.valor.tipo == tipoasignar.tipo) {
                        tipoasignar.data = value;
                    }
                }
            }












        }
    }//* sino entonces voy a asignar una variable normalmente.
    else{
      //! Primero verifico de que no de ningun tipo de errores la EJECUCION
        if (value.valor != Tipo(tipo.ERROR)) {
            //! Busco en mi lista Simbolos el valor para saber el tipo a asignar.
            var tipoasignar = Tablita.TablaSimbolos().getSimbol(this.variable); // envio el nombre de la variable

            if (this.valor == null) {
            //! si el valor es nulo es porque no hay nada que asignar
            //* si lo encontro entonces asigno su tipo correspondiente:
            if (tipoasignar != null) {
                //! procedo a agregar valores por defecto.
                if (tipoasignar.tipo == Tipo(tipo.INT)) {
                this.valor = new val(this.fila, this.column, Tipo(tipo.INT), 0);
                } else if (tipoasignar.tipo == Tipo(tipo.DOUBLE)) {
                this.valor = new val(
                    this.fila,
                    this.column,
                    Tipo(tipo.DOUBLE),
                    0.0
                );
                } else if (tipoasignar.tipo == Tipo(tipo.BOOLEAN)) {
                this.valor = new val(
                    this.fila,
                    this.column,
                    Tipo(tipo.BOOLEAN),
                    true
                );
                } else if (tipoasignar.tipo == Tipo(tipo.CARACTER)) {
                this.valor = new val(
                    this.fila,
                    this.column,
                    Tipo(tipo.CARACTER),
                    ""
                );
                } else if (tipoasignar.tipo == Tipo(tipo.STRING)) {
                this.valor = new val(
                    this.fila,
                    this.column,
                    Tipo(tipo.STRING),
                    ""
                );
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
                return new val(
                this.fila,
                this.column,
                Tipo(tipo.ERROR),
                "(ERROR SEMANTICO) La variable no ha sido declarada " +
                    tipoasignar.tipo
                );
            }
            //? y guardo el valor:
            if (this.valor.tipo == tipoasignar.tipo) {
                tipoasignar.data = value;
            }
            } //! si el valor ahora no es nulo, entonces necesito guardar su valor
            else {
            //? y guardo el valor:
            if (this.valor.tipo == tipoasignar.tipo) {
                tipoasignar.data = value;
            }
            }
        }
    }
    
}
}
exports.asignar = asignar;
