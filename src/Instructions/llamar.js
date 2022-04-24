"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.llamar = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const Tablita = require("./TS/TablaSimbolos");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const INSreturn = require('./INSreturn');
const INSRelacional = require('../Instructions/INSRelacional');
const INSBreak = require('./Break');
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  5.21 Llamadas  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class llamar {
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
            this.parametros[i].ejecutar(arbolIns, addtable);
        }
        //* luego de haber ejecutado todos los parametros debo buscar la funcion en 
        //* la tabla de simbolos
        var funcion = table.getSimbol(this.variable.id);
        if (funcion == null) {
            arbolIns.setError(instruccionesAPI.errorSemantico("No se ha encontrado la funcion " + this.variable.id, this.fila, this.column));
            return new val(this.fila, this.column, Tipo.ERROR, "No se ha encontrado la funcion " + this.variable.id);
        }else{
            //* si la funcion existe debo verificar que el numero de parametros sea el mismo
            if (this.parametros.length != funcion.data.metodo.parametros.length) {
                arbolIns.setError(instruccionesAPI.errorSemantico("El numero de parametros no es el mismo", this.fila, this.column));
                return new val(this.fila, this.column, Tipo.ERROR, "El numero de parametros no es el mismo");
            }else{
                //* si el numero de parametros es el mismo debo verificar que los tipos de los parametros
                //* sean los mismos
                for (let i = 0; i < this.parametros.length; i++) {
                    if (this.parametros[i].tipo != funcion.data.metodo.parametros[i].tipo) {
                        arbolIns.setError(instruccionesAPI.errorSemantico("Los tipos de los parametros no son los mismos"+this.parametros[i].tipo +" y "+funcion.parametros[i].tipo, this.fila, this.column));
                        return new val(this.fila, this.column, Tipo.ERROR, "Los tipos de los parametros no son los mismos"+this.parametros[i].tipo +" y "+funcion.parametros[i].tipo);
                    }
                    var parametro = this.parametros[i].ejecutar(arbolIns, table);
                }
                //* si los tipos de los parametros son los mismos debo evaluar la funcion
                //* con los parametros que se le pasaron y luego retornar el valor de la funcion
                var respuestamethod = funcion.data.metodo.ins 
                //si tengo ahora la lista de instrucciones dentro del metodo, y no es nulo:
                if(respuestamethod){
                    // las ejecuto.
                    for (let i = 0; i < this.respuestamethod.length; i++) {
                        let respuesta2 = this.respuestamethod[i].ejecutar(arbolIns, table);//instruccion del metodo
                        try {
                            if(respuesta2.kind=="BREAK"){
                                return respuesta2;
                            }
                            if(respuesta2.kind=="CONTINUE"){
                                break ;
                            }
                            if(respuesta2 instanceof INSreturn.INSreturn){
                                //si la respuesta2 valor es nulo voy y comparo el tipo de la funcion 
                                //que esta retornando
                                if(respuesta2.valor==null && funcion.tipo==Tipo.tipos.NULL){
                                    return respuesta2.newvalor;
                                }
                                // si la respuesta2 es de otro tipo verifico que ese retorno de la 
                                // respuesta2 sea del mismo tipo que la funcion que estoy llamando
                                if(respuesta2.valor!=null||respuesta2.valor.tipo!=tipo.ERROR){
                                    if(funcion.tipo.tipo===respuesta2.valor.tipo){
                                        return respuesta2.newvalor;
                                    }else{
                                        if (funcion.tipo.tipo == Tipo.DOUBLE && (respuesta2.valor.tipo.tipo == Tipo.INT)) {
                                            return respuesta2.newvalor;
                                        }
                                        arbolIns.setError(instruccionesAPI.errorSemantico("El tipo de retorno y el de la funcion no son iguales tipo funcion:"+funcion.tipo.tipo+" y tipo del retorno: "+respuesta2.valor.tipo.tipo ,this.fila,this.column));
                                        return new val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) El tipo de retorno y el de la funcion no son iguales tipo funcion:"+funcion.tipo.tipo+" y tipo del retorno: "+respuesta2.valor.tipo.tipo);
                                    }
                                }
                            }
                            //! falta retornos
                        } catch (error) {
                            arbolIns.setError(instruccionesAPI.errorSemantico("Error semantico dentro del metodo: "+this.variable.id,this.fila,this.column));
                            return new val(this.fila,this.column,Tipo.ERROR,"Error semantico dentro del metodo: "+this.variable.id);
                            // console.log(error);
                        }
                    }
                }
                return null
            }
        }
    }
}

exports.llamar = llamar