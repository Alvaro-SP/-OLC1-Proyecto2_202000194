"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aritmetico = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
class aritmetico{
    constructor(expDer, expIzq, tipo, fila, column){
        this.expDer = expDer;
        this.expIzq = expIzq;
        this.tipo = tipo;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns, table){
        // Using recursivity i gonna to execute my methods for to show in console
        if(this.expDer===null){
            let valortemp = this.expIzq.ejecutar(arbolIns, table);
            var value = valortemp;
            if(this.tipo == 'UNITARIA'){
                if(value.tipo == Tipo(tipo.INT)){
                    return new val(this.fila, this.column, Tipo(tipo.INT), value.valor*-1);
                }
                else if(value.tipo == Tipo(tipo.DOUBLE)){
                    return new val(this.fila, this.column, Tipo(tipo.INT), value.valor*-1);
                }
                else{
                    arbolIns.setError(instruccionesAPI.errorSemantico("No se puede obtener el tipo de Operador "+value.tipo,this.fila,this.column));
                    return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede obtener el tipo de Operador "+value.tipo+" y "+value2.tipo);
                }
            }
        }
        if(this.expDer!==null){
            let valortemp = this.expDer.ejecutar(arbolIns, table);
            let valortemp2 = this.expIzq.ejecutar(arbolIns, table);
            var value = valortemp;
            var value2 = valortemp2;
            if(value != Tipo(tipo.ERROR) && value2 != Tipo(tipo.ERROR)){
                //! **********************     SI ES UNA SUMA:  ***********************************
                if(this.tipo == 'SUMA'){
                    if(value.tipo == Tipo(tipo.INT)){ //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> ENTERO
                            return new val(this.fila, this.column, Tipo(tipo.INT), value.valor + value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor + value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.BOOLEAN)){//? BOOLEAN -----> ENTERO
                            if(value2.valor == true){
                                return new val(this.fila, this.column, Tipo(tipo.INT), value.valor + 1);
                            }else{
                                return new val(this.fila, this.column, Tipo(tipo.INT), value.valor);
                            }
                        }
                        else if(value2.tipo == Tipo(tipo.CARACTER)){//? CARACTER -----> ENTERO
                            try {
                                return new val(this.fila, this.column, Tipo(tipo.INT), value2.valor.charCodeAt(0)+value.valor);
                            } catch (error) {
                                return new val(this.fila, this.column, Tipo(tipo.INT), value.valor);
                            }
                        }
                        else if(value2.tipo == Tipo(tipo.STRING)){//? CADENA -----> CADENA
                            return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + value2.valor);
                        }else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else if(value.tipo == Tipo(tipo.DOUBLE)){ //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor + value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor + value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.BOOLEAN)){//? BOOLEAN -----> DOUBLE
                            if(value2.valor == true){
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor + 1);
                            }else{
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor);
                            }
                        }
                        else if(value2.tipo == Tipo(tipo.CARACTER)){//? CARACTER -----> DOUBLE
                            try {
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE ), value2.valor.charCodeAt(0)+value.valor);
                            } catch (error) {
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor);
                            }
                        }
                        else if(value2.tipo == Tipo(tipo.STRING)){//? CADENA -----> CADENA
                            return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + value2.valor);
                        }else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else if(value.tipo == Tipo(tipo.BOOLEAN)){ //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> ENTERO
                            if(value.valor == true){
                                return new val(this.fila, this.column, Tipo(tipo.INT), value2.valor + 1);
                            }else{
                                return new val(this.fila, this.column, Tipo(tipo.INT), value2.valor);
                            }
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            if(value.valor == true){
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value2.valor + 1);
                            }else{
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value2.valor);
                            }
                        }
                        
                        // else if(value2.tipo == Tipo(tipo.BOOLEAN)){//? BOOLEAN -----> ENTERO
                        //     if(value2.valor == true){
                        //         return new val(this.fila, this.column, Tipo(tipo.INT), value.valor + 1);
                        //     }else{
                        //         return new val(this.fila, this.column, Tipo(tipo.INT), value.valor);
                        //     }
                        // }
                        // else if(value2.tipo == Tipo(tipo.CARACTER)){//? CARACTER -----> ENTERO
                        //     try {
                        //         return new val(this.fila, this.column, Tipo(tipo.INT), value2.charCodeAt(0)+value.valor);
                        //     } catch (error) {
                        //         return new val(this.fila, this.column, Tipo(tipo.INT), value.valor);
                        //     }
                        // }
                        
                        else if(value2.tipo == Tipo(tipo.STRING)){//? CADENA -----> CADENA
                            if(value.valor == true){
                                return new val(this.fila, this.column, Tipo(tipo.STRING), 'true'+value2.valor);
                            }else{
                                return new val(this.fila, this.column, Tipo(tipo.STRING), 'false'+value2.valor);
                            }
                        }else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else if(value.tipo == Tipo(tipo.CARACTER)){ //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> ENTERO
                            try {
                                return new val(this.fila, this.column, Tipo(tipo.INT), value.valor.charCodeAt(0)+value2.valor);
                            } catch (error) {
                                return new val(this.fila, this.column, Tipo(tipo.INT), value2.valor);
                            }
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value2.valor + value.valor.charCodeAt(0));
                        }
                        // else if(value2.tipo == Tipo(tipo.BOOLEAN)){//? BOOLEAN -----> ENTERO
                        //     if(value2.valor == true){
                        //         return new val(this.fila, this.column, Tipo(tipo.INT), value.valor + 1);
                        //     }else{
                        //         return new val(this.fila, this.column, Tipo(tipo.INT), value.valor);
                        //     }
                        // }
                        else if(value2.tipo == Tipo(tipo.CARACTER)){//? CARACTER -----> CADENA
                            try {
                                return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor+value2.valor);
                            } catch (error) {
                                return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor);
                            }
                        }
                        else if(value2.tipo == Tipo(tipo.STRING)){//? CADENA -----> CADENA
                            return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + value2.valor);
                        }else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else if(value.tipo == Tipo(tipo.STRING)){ //! CADENA!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> STRING
                            return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> STRING
                            return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.BOOLEAN)){//? BOOLEAN -----> STRING
                            if(value2.valor == true){
                                return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + 'true');
                            }else{
                                return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + 'false');
                            }
                        }
                        else if(value2.tipo == Tipo(tipo.CARACTER)){//? CARACTER -----> STRING
                            return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor+value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.STRING)){//? CADENA -----> CADENA
                            return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + value2.valor);
                        }else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else{
                        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                        return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                    }
                }
                //! **********************     SI ES UNA RESTA:  ***********************************
                else if(this.tipo == 'RESTA'){
                    if(value.tipo == Tipo(tipo.INT)){ //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> ENTERO
                            return new val(this.fila, this.column, Tipo(tipo.INT), value.valor - value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor - value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.BOOLEAN)){//? BOOLEAN -----> ENTERO
                            if(value2.valor == true){
                                return new val(this.fila, this.column, Tipo(tipo.INT), value.valor - 1);
                            }else{
                                return new val(this.fila, this.column, Tipo(tipo.INT), value.valor);
                            }
                        }
                        else if(value2.tipo == Tipo(tipo.CARACTER)){//? CARACTER -----> ENTERO
                            try {
                                return new val(this.fila, this.column, Tipo(tipo.INT), value.valor - value2.valor.charCodeAt(0));
                            } catch (error) {
                                return new val(this.fila, this.column, Tipo(tipo.INT), value.valor);
                            }
                        }
                        // else if(value2.tipo == Tipo(tipo.STRING)){//? CADENA -----> CADENA
                        //     return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + value2.valor);
                        // }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else if(value.tipo == Tipo(tipo.DOUBLE)){ //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor - value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor - value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.BOOLEAN)){//? BOOLEAN -----> DOUBLE
                            if(value2.valor == true){
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor - 1);
                            }else{
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor);
                            }
                        }
                        else if(value2.tipo == Tipo(tipo.CARACTER)){//? CARACTER -----> DOUBLE
                            try {
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE ), value.valor - value2.valor.charCodeAt(0));
                            } catch (error) {
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor);
                            }
                        }
                        // else if(value2.tipo == Tipo(tipo.STRING)){//? CADENA -----> CADENA
                        //     return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + value2.valor);
                        // }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else if(value.tipo == Tipo(tipo.BOOLEAN)){ //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> ENTERO
                            if(value.valor == true){
                                return new val(this.fila, this.column, Tipo(tipo.INT), value2.valor - 1);
                            }else{
                                return new val(this.fila, this.column, Tipo(tipo.INT), value2.valor);
                            }
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            if(value.valor == true){
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value2.valor - 1);
                            }else{
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value2.valor);
                            }
                        }
                        
                        // else if(value2.tipo == Tipo(tipo.BOOLEAN)){//? BOOLEAN -----> ENTERO
                        //     if(value2.valor == true){
                        //         return new val(this.fila, this.column, Tipo(tipo.INT), value.valor + 1);
                        //     }else{
                        //         return new val(this.fila, this.column, Tipo(tipo.INT), value.valor);
                        //     }
                        // }
                        // else if(value2.tipo == Tipo(tipo.CARACTER)){//? CARACTER -----> ENTERO
                        //     try {
                        //         return new val(this.fila, this.column, Tipo(tipo.INT), value2.charCodeAt(0)+value.valor);
                        //     } catch (error) {
                        //         return new val(this.fila, this.column, Tipo(tipo.INT), value.valor);
                        //     }
                        // }
                        
                        // else if(value2.tipo == Tipo(tipo.STRING)){//? CADENA -----> CADENA
                        //     if(value.valor == true){
                        //         return new val(this.fila, this.column, Tipo(tipo.STRING), 'true'+value2.valor);
                        //     }else{
                        //         return new val(this.fila, this.column, Tipo(tipo.STRING), 'false'+value2.valor);
                        //     }
                        // }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else if(value.tipo == Tipo(tipo.CARACTER)){ //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> ENTERO
                            try {
                                return new val(this.fila, this.column, Tipo(tipo.INT), value.valor.charCodeAt(0)-value2.valor);
                            } catch (error) {
                                return new val(this.fila, this.column, Tipo(tipo.INT), value2.valor);
                            }
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value2.valor - value.valor.charCodeAt(0));
                        }
                        // else if(value2.tipo == Tipo(tipo.BOOLEAN)){//? BOOLEAN -----> ENTERO
                        //     if(value2.valor == true){
                        //         return new val(this.fila, this.column, Tipo(tipo.INT), value.valor + 1);
                        //     }else{
                        //         return new val(this.fila, this.column, Tipo(tipo.INT), value.valor);
                        //     }
                        // }
                        // else if(value2.tipo == Tipo(tipo.CARACTER)){//? CARACTER -----> CADENA
                        //     try {
                        //         return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor+value2.valor);
                        //     } catch (error) {
                        //         return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor);
                        //     }
                        // }
                        // else if(value2.tipo == Tipo(tipo.STRING)){//? CADENA -----> CADENA
                        //     return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + value2.valor);
                        // }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    // else if(value.tipo == Tipo(tipo.STRING)){ //! CADENA!!!!!!!!!!!!!!!!!!!!!!!!!
                    //     if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> STRING
                    //         return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + value2.valor);
                    //     }
                    //     else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> STRING
                    //         return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + value2.valor);
                    //     }
                    //     else if(value2.tipo == Tipo(tipo.BOOLEAN)){//? BOOLEAN -----> STRING
                    //         if(value2.valor == true){
                    //             return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + 'true');
                    //         }else{
                    //             return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + 'false');
                    //         }
                    //     }
                    //     else if(value2.tipo == Tipo(tipo.CARACTER)){//? CARACTER -----> STRING
                    //         return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor+value2.valor);
                    //     }
                    //     else if(value2.tipo == Tipo(tipo.STRING)){//? CADENA -----> CADENA
                    //         return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + value2.valor);
                    //     }else{
                    //         arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                    //         return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                    //     }
                    // }
                    else{
                        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                        return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                    }
                }
                //! **********************     SI ES UNA MULTIPLICACION:  ***********************************
                else if(this.tipo == 'MULTIPLICACION'){
                    if(value.tipo == Tipo(tipo.INT)){ //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> ENTERO
                            return new val(this.fila, this.column, Tipo(tipo.INT), value.valor * value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor * value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.CARACTER)){//? CARACTER -----> ENTERO
                            try {
                                return new val(this.fila, this.column, Tipo(tipo.INT), value.valor * value2.valor.charCodeAt(0));
                            } catch (error) {
                                return new val(this.fila, this.column, Tipo(tipo.INT), value.valor);
                            }
                        }
                        // else if(value2.tipo == Tipo(tipo.STRING)){//? CADENA -----> CADENA
                        //     return new val(this.fila, this.column, Tipo(tipo.STRING), value.valor + value2.valor);
                        // }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else if(value.tipo == Tipo(tipo.DOUBLE)){ //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor * value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor * value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.CARACTER)){//? CARACTER -----> DOUBLE
                            try {
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE ), value.valor * value2.valor.charCodeAt(0));
                            } catch (error) {
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor);
                            }
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else if(value.tipo == Tipo(tipo.CARACTER)){ //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> ENTERO
                            try {
                                return new val(this.fila, this.column, Tipo(tipo.INT), value.valor.charCodeAt(0)*value2.valor);
                            } catch (error) {
                                return new val(this.fila, this.column, Tipo(tipo.INT), value2.valor);
                            }
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value2.valor * value.valor.charCodeAt(0));
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else{
                        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                        return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                    }
                }
                //! **********************     SI ES UNA DIVISION:  ***********************************
                else if(this.tipo == 'DIVISION'){
                    if(value.tipo == Tipo(tipo.INT)){ //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> ENTERO
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor / value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor / value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.CARACTER)){//? CARACTER -----> ENTERO
                            try {
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor / value2.valor.charCodeAt(0));
                            } catch (error) {
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor);
                            }
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else if(value.tipo == Tipo(tipo.DOUBLE)){ //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor / value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor / value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.CARACTER)){//? CARACTER -----> DOUBLE
                            try {
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE ), value.valor / value2.valor.charCodeAt(0));
                            } catch (error) {
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor);
                            }
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else if(value.tipo == Tipo(tipo.CARACTER)){ //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> DOUBLE
                            try {
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor.charCodeAt(0)/value2.valor);
                            } catch (error) {
                                return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value2.valor);
                            }
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value2.valor / value.valor.charCodeAt(0));
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else{
                        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede DIVIDIR los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                        return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede DIVIDIR los tipos "+value.tipo+" y "+value2.tipo);
                    }
                }
                //! **********************     SI ES UNA POTENCIA:  ***********************************
                else if(this.tipo == 'POTENCIA'){
                    if(value.tipo == Tipo(tipo.INT)){ //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> ENTERO
                            return new val(this.fila, this.column, Tipo(tipo.INT), Math.pow(value.valor, value2.valor));
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE),  Math.pow(value.valor, value2.valor));
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else if(value.tipo == Tipo(tipo.DOUBLE)){ //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE),  Math.pow(value.valor, value2.valor));
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE),  Math.pow(value.valor, value2.valor));
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede elevar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    
                    else{
                        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede elevar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                        return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
                    }
                }
                //! **********************     SI ES UNA MODULACION...:  ***********************************
                else if(this.tipo == 'MODULO'){
                    if(value.tipo == Tipo(tipo.INT)){ //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> ENTERO
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor % value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor % value2.valor);
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sacar el modulo de los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sacar el modulo de  los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else if(value.tipo == Tipo(tipo.DOUBLE)){ //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(value2.tipo == Tipo(tipo.INT)){ //? ENTERO -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor % value2.valor);
                        }
                        else if(value2.tipo == Tipo(tipo.DOUBLE)){//? DOUBLE -----> DOUBLE
                            return new val(this.fila, this.column, Tipo(tipo.DOUBLE), value.valor % value2.valor);
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sacar el modulo de los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                            return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sacar el modulo de los tipos "+value.tipo+" y "+value2.tipo);
                        }
                    }
                    else{
                        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+value.tipo+" y "+value2.tipo,this.fila,this.column));
                        return new val(this.fila, this.column, Tipo(tipo.ERROR), "(ERROR SEMANTICO) No se puede sumar los tipos "+value.tipo+" y "+value2.tipo);
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
    }
}
exports.aritmetico = aritmetico;

