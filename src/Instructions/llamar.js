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
const { Break } = require("./Break");
const { Continue } = require("./Continue");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  5.21 Llamadas  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class llamar extends nodo.nodo{
    constructor(variable, parametros, fila, column) {
        super(null)
        this.variable = variable;
        this.parametros = parametros;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns, table) {
        // console.log("****************************INS LLAMAR METODO******************************")
        var value;
        value=this.variable.toString()
        var addtable = new Tablita.TablaSimbolos(table);
        var a=0;
        //* no se que valores se van a pasar en la funcion entonces necesito ejecutar
        //* cada uno de los parametros para que se guarden sus valores:
        if(this.parametros==null){
            this.parametros=[]
        }
        for (let i = 0; i < this.parametros.length; i++) {
            this.parametros[i].ejecutar(arbolIns, addtable);
            a++;
        }
        value=value+a+"_M2412"// mi id que se le asigna a todos los metodos :)
        //* luego de haber ejecutado todos los parametros debo buscar la funcion en 
        //* la tabla de simbolos
        var funcion = table.getSimbol(value);
        if (funcion == null) {
            arbolIns.setError(instruccionesAPI.errorSemantico("No se ha encontrado la funcion " + value, this.fila, this.column));
            return new val.val(this.fila, this.column, Tipo.ERROR, "No se ha encontrado la funcion " + this.variable);
        }else{
            //* si la funcion existe debo verificar que el numero de parametros sea el mismo
            if (this.parametros.length != funcion.data.parametros.length) {
                arbolIns.setError(instruccionesAPI.errorSemantico("El numero de parametros no es el mismo", this.fila, this.column));
                return new val.val(this.fila, this.column, Tipo.ERROR, "El numero de parametros no es el mismo");
            }else{
                //* si el numero de parametros es el mismo debo verificar que los tipos de los parametros
                //* sean los mismos
                var param = funcion.data.parametros;
                // var param = funcion.data.ins;
                for (let i = 0; i < param.length; i++) {
                    if (param[i].tipo != param[i].tipo) {
                        arbolIns.setError(instruccionesAPI.errorSemantico("Los tipos de los parametros no son los mismos"+this.parametros[i].tipo +" y "+funcion.parametros[i].tipo, this.fila, this.column));
                        return new val.val(this.fila, this.column, Tipo.ERROR, "Los tipos de los parametros no son los mismos"+this.parametros[i].tipo +" y "+funcion.parametros[i].tipo);
                    }
                    param[i].valor=this.parametros[i]
                    var parametro = param[i].ejecutar(arbolIns, addtable);
                }
                //* si los tipos de los parametros son los mismos debo evaluar la funcion
                //* con los parametros que se le pasaron y luego retornar el valor de la funcion
                var respuestamethod = funcion.data.ins
                if(respuestamethod){
                    // console.log("respuestamethod.length del for de LLAMAR")
                    // console.log(respuestamethod.length)
                    
                    for (let i = 0; i < respuestamethod.length; i++) {
                        let respuesta2 = respuestamethod[i].ejecutar(arbolIns, addtable);//instruccion del metodo
                        // console.log("****************************RESULTADO******************************") 
                        // console.log("****************************RESULTADO******************************") 
                        // console.log("RESULTADO: " );
                        // console.log(respuesta2 );
                        // console.log("**************************** FINNN RESULTADO******************************") 
                        try {
                            if(respuesta2 instanceof Break){
                                return respuesta2;
                            }
                            if(respuesta2 instanceof Continue){
                                return respuesta2;
                            }
                            if(respuesta2 instanceof INSreturn.INSreturn){
                                if(funcion.tipo==Tipo.VOID){
                                    arbolIns.setError(instruccionesAPI.errorSemantico("No se puede retornar por el tipo de funcion." ,this.fila,this.column));
                                    arbolIns.console.push("No se puede retornar por el tipo de funcion."+" en la fila: "+this.fila+" y la columna: "+this.column);
                                    return new val.val(this.fila,this.column,Tipo.ERROR,"No se puede retornar por el tipo de funcion");

                                }else{
                                    if(respuesta2.expre !=null){
                                        this.tipo=respuesta2.expre.tipo;
                                        respuesta2.ejecutar(arbolIns,addtable);
                                        var ret = respuesta2.exp
                                        if(funcion.tipo==respuesta2.expre.tipo){
                                            // console.log("VALOR RETORNADO EN LLAMAR:")
                                            // console.log(respuesta2.expre.valor);
                                            // console.log(respuesta2.exp);
                                            // console.log(respuesta2.expre);
                                            return ret;
                                        }else{
                                            if(funcion.tipo==Tipo.DOUBLE && (respuesta2.exp.tipo==Tipo.INT)){
                                                return ret;
                                            }
                                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede retornar por el tipo de funcion." ,this.fila,this.column));
                                            arbolIns.console.push("No se puede retornar por el tipo de funcion."+" en la fila: "+this.fila+" y la columna: "+this.column);
                                            return new val.val(this.fila,this.column,Tipo.ERROR,"No se puede retornar por el tipo de funcion");

                                        }
                                    }else{
                                        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede retornar por el tipo de funcion." ,this.fila,this.column));
                                        arbolIns.console.push("No se puede retornar por el tipo de funcion."+" en la fila: "+this.fila+" y la columna: "+this.column);
                                        return new val.val(this.fila,this.column,Tipo.ERROR,"No se puede retornar por el tipo de funcion");

                                    }
                                }

                                //si la respuesta2 valor es nulo voy y comparo el tipo de la funcion 
                                //que esta retornando
                                // if(respuesta2.valor==null && funcion.tipo==Tipo.tipos.NULL){
                                //     return respuesta2.newvalor;
                                // }
                                // // si la respuesta2 es de otro tipo verifico que ese retorno de la 
                                // // respuesta2 sea del mismo tipo que la funcion que estoy llamando
                                // if(respuesta2.valor!=null||respuesta2.valor.tipo!=tipo.ERROR){
                                //     if(funcion.tipo.tipo===respuesta2.valor.tipo){
                                //         return respuesta2.newvalor;
                                //     }else{
                                //         if (funcion.tipo.tipo == Tipo.DOUBLE && (respuesta2.valor.tipo.tipo == Tipo.INT)) {
                                //             return respuesta2.newvalor;
                                //         }
                                //         arbolIns.setError(instruccionesAPI.errorSemantico("El tipo de retorno y el de la funcion no son iguales tipo funcion:"+funcion.tipo.tipo+" y tipo del retorno: "+respuesta2.valor.tipo.tipo ,this.fila,this.column));
                                //         return new val.val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) El tipo de retorno y el de la funcion no son iguales tipo funcion:"+funcion.tipo.tipo+" y tipo del retorno: "+respuesta2.valor.tipo.tipo);
                                //     }
                                // }

                            }
                            //! falta retornos
                        } catch (error) {
                            arbolIns.setError(instruccionesAPI.errorSemantico("Error semantico dentro del metodo: "+this.variable.id,this.fila,this.column));
                            return new val.val(this.fila,this.column,Tipo.ERROR,"Error semantico dentro del metodo: "+this.variable.id);
                            // console.log(error);
                        }
                    }
                    if(funcion.tipo!=Tipo.VOID){
                        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede obtener el retorno de esta funcion, revise que exista." ,this.fila,this.column));
                        arbolIns.console.push("No se puede obtener el retorno de esta funcion, revise que exista."+" en la fila: "+this.fila+" y la columna: "+this.column);
                        return new val.val(this.fila,this.column,Tipo.ERROR,"No se puede obtener el retorno de esta funcion, revise que exista.");

                    }
                }
                return null
            }
        }
    }
}

exports.llamar = llamar

// int vector1[] = new int[4]; 
// vector1[2]=5; 
// print(vector1[1+1]+55); 
// int abc=5;

// string d="adios";
// print(round(5.4523456));
// print(typeof(abc));
// print(Tostring(abc));
// print(ToCharArray(d));
// char a[] = ToCharArray(d);
// print(a[0]);
// print(a[1]);
// print(a[2]); 