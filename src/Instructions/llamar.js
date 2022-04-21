"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.llamada = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const Tablita = require("./TS/TablaSimbolos");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const INSRelacional = require('../Instructions/INSRelacional');
const INSBreak = require('../Instructions/break');
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  5.21 Llamadas  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class llamada {
    constructor(variable, parametros, fila, column) {
        this.variable = variable;
        this.parametros = parametros;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns, table) {
        var addtable = new Tablita.TablaSimbolos(table);
        //* no se que valores se van a pasar en la funcion entonces necesito ejecutar
        //* cada uno de los parametros para que se guarden sus valores:
        for (let i = 0; i < this.parametros.length; i++) {
            this.parametros[i].ejecutar(arbolIns, table);
        }
        //* luego de haber ejecutado todos los parametros debo buscar la funcion en 
        //* la tabla de simbolos
        var funcion = table.getSimbol(this.variable.id);
        if (funcion == null) {
            arbolIns.setError(instruccionesAPI.errorSemantico("No se ha encontrado la funcion " + this.variable.id, this.fila, this.column));
            return new val(this.fila, this.column, Tipo(tipo.ERROR), "No se ha encontrado la funcion " + this.variable.id);
        }else{
            //* si la funcion existe debo verificar que el numero de parametros sea el mismo
            if (this.parametros.length != funcion.parametros.length) {
                arbolIns.setError(instruccionesAPI.errorSemantico("El numero de parametros no es el mismo", this.fila, this.column));
                return new val(this.fila, this.column, Tipo(tipo.ERROR), "El numero de parametros no es el mismo");
            }else{
                //* si el numero de parametros es el mismo debo verificar que los tipos de los parametros
                //* sean los mismos
                for (let i = 0; i < this.parametros.length; i++) {
                    if (this.parametros[i].tipo != funcion.parametros[i].tipo) {
                        arbolIns.setError(instruccionesAPI.errorSemantico("Los tipos de los parametros no son los mismos"+this.parametros[i].tipo +" y "+funcion.parametros[i].tipo, this.fila, this.column));
                        return new val(this.fila, this.column, Tipo(tipo.ERROR), "Los tipos de los parametros no son los mismos"+this.parametros[i].tipo +" y "+funcion.parametros[i].tipo);
                    }
                }
                //* si los tipos de los parametros son los mismos debo evaluar la funcion
                //* con los parametros que se le pasaron y luego retornar el valor de la funcion
                
            }
        }
    }
}

exports.llamada = llamada