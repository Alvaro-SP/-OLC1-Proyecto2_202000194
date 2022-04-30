"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSAritmetico = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
// const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.5 Operadores Aritméticos▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// *SUMA RESTA MULTIPLICACION DIVISION POTENCIA MODULO ENTRE OTROS...
class INSAritmetico extends nodo.nodo{
    constructor(expDer, expIzq, op, fila, column){
        super(null)
        this.expDer = expDer;
        this.expIzq = expIzq;
        this.op= op;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns, table){
        // Using recursivity i gonna to execute my methods for to show in console
        if(this.expDer===null){
            let valortemp = this.expIzq.ejecutar(arbolIns, table);
            var value = valortemp;
            if(this.op== 'UNITARIA'){
                if(this.expIzq.tipo == Tipo.INT){
                    var temp= new val.val(this.fila, this.column, Tipo.INT, value*-1);
                    this.tipo=Tipo.INT
                    return temp.valor
                }
                else if(this.expIzq.tipo == Tipo.DOUBLE){
                    var temp= new val.val(this.fila, this.column, Tipo.INT, value*-1);
                    this.tipo=Tipo.DOUBLE
                    return temp.valor
                }
                else{
                    arbolIns.setError(instruccionesAPI.errorSemantico("No se puede obtener el tipo de Operador "+this.expIzq.tipo,this.fila,this.column));
                    return new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede obtener el tipo de Operador "+this.expDer.tipo+" y "+this.expIzq.tipo);
                }
            }
        }
        if(this.expDer!==null){
            let valortemp = this.expDer.ejecutar(arbolIns, table);
            let valortemp2 = this.expIzq.ejecutar(arbolIns, table);
            // console.log("valores a operar con INSARITMETICA: ")
            // console.log(valortemp)
            // console.log(valortemp2)
            var value = new val.val(0, 0, 0, valortemp);
            var value2 = new val.val(0, 0, 0, valortemp2);
            if(value != Tipo.ERROR && value2 != Tipo.ERROR){
                //! **********************     SI ES UNA SUMA:  ***********************************
                if(this.op== 'SUMA'){
                    if(this.expDer.tipo == Tipo.INT){ //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> ENTERO
                            var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor + value2.valor);
                            this.tipo=Tipo.INT
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor + value2.valor);
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.BOOLEAN){//? BOOLEAN -----> ENTERO
                            if(this.expIzq.valor == true){
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor + 1);
                                this.tipo=Tipo.INT
                                return temp.valor
                            }else{
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor);
                                this.tipo=Tipo.INT
                                return temp.valor
                            }
                        }
                        else if(this.expIzq.tipo == Tipo.CARACTER){//? CARACTER -----> ENTERO
                            try {
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value2.valor.charCodeAt(0)+value.valor);
                                this.tipo=Tipo.STRING
                                return temp.valor
                            } catch (error) {
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor);
                                this.tipo=Tipo.STRING
                                return temp.valor
                            }
                        }
                        else if(this.expIzq.tipo == Tipo.STRING){//? CADENA -----> CADENA
                            var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + value2.valor);
                            this.tipo=Tipo.STRING
                            return temp.valor
                        }else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+this.expIzq.tipo+" y "+this.expDer.tipo,this.fila,this.column));
                            return new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede sumar los tipos "+this.expIzq.tipo+" y "+this.expDer.tipo);
                        }
                    }
                    else if(this.expDer.tipo == Tipo.DOUBLE){ //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor + value2.valor);
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor + value2.valor);
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.BOOLEAN){//? BOOLEAN -----> DOUBLE
                            if(this.expIzq.valor == true){
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor + 1);
                                this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }else{
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor);
                                this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        }
                        else if(this.expIzq.tipo == Tipo.CARACTER){//? CARACTER -----> DOUBLE
                            try {
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value2.valor.charCodeAt(0)+value.valor);
                                this.tipo=Tipo.DOUBLE
                                return temp.valor
                            } catch (error) {
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor);
                                return temp.valor
                            }
                        }
                        else if(this.expIzq.tipo == Tipo.STRING){//? CADENA -----> CADENA
                            var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + value2.valor);
                            this.tipo=Tipo.STRING
                            return temp.valor
                        }else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede sumar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    else if(this.expDer.tipo == Tipo.BOOLEAN){ //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo== Tipo.INT){ //? ENTERO -----> ENTERO
                            if(this.expDer.tipo.valor == true){
                                this.tipo=Tipo.INT
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value2.valor + 1);
                                return temp.valor
                            }else{
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value2.valor);
                                this.tipo=Tipo.INT
                                return temp.valor
                            }
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            if(this.expDer.valor == true){
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value2.valor + 1);
                                this.tipo=Tipo.DOUBLE
                                return temp.valor
                            }else{
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value2.valor);
                                this.tipo=Tipo.DOUBLE
                                return temp.valor
                            }
                        }
                        
                        // else if(value2.tipo == Tipo.BOOLEAN){//? BOOLEAN -----> ENTERO
                        //     if(value2.valor == true){
                        //         var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor + 1);
                        //     }else{
                        //         var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor);
                        //     }
                        // }
                        // else if(value2.tipo == Tipo.CARACTER){//? CARACTER -----> ENTERO
                        //     try {
                        //         var temp= new val.val(this.fila, this.column, Tipo.INT, value2.charCodeAt(0)+value.valor);
                        //     } catch (error) {
                        //         var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor);
                        //     }
                        // }
                        
                        else if(this.expIzq.tipo == Tipo.STRING){//? CADENA -----> CADENA
                            if(this.expDer.valor == true){
                                var temp= new val.val(this.fila, this.column, Tipo.STRING, 'true'+value2.valor);
                                this.tipo=Tipo.STRING
                                return temp.valor
                            }else{
                                var temp= new val.val(this.fila, this.column, Tipo.STRING, 'false'+value2.valor);
                                this.tipo=Tipo.STRING
                                return temp.valor
                            }
                        }else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede sumar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    else if(this.expDer.tipo == Tipo.CARACTER){ //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> ENTERO
                            try {
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor.charCodeAt(0)+value2.valor);
                                this.tipo=Tipo.INT
                            return temp.valor
                        } catch (error) {
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value2.valor);
                                this.tipo=Tipo.INT
                            return temp.valor
                        }
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value2.valor + value.valor.charCodeAt(0));
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        // else if(value2.tipo == Tipo.BOOLEAN){//? BOOLEAN -----> ENTERO
                        //     if(value2.valor == true){
                        //         var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor + 1);
                        //     }else{
                        //         var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor);
                        //     }
                        // }
                        else if(this.expIzq.tipo == Tipo.CARACTER){//? CARACTER -----> CADENA
                            try {
                                var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor+value2.valor);
                                this.tipo=Tipo.STRING
                            return temp.valor
                        } catch (error) {
                                var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor);
                                this.tipo=Tipo.STRING
                            return temp.valor
                        }
                        }
                        else if(this.expIzq.tipo == Tipo.STRING){//? CADENA -----> CADENA
                            var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + value2.valor);
                            this.tipo=Tipo.STRING
                            return temp.valor
                        }else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede sumar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp.valor
                        }
                    }
                    else if(this.expDer.tipo == Tipo.STRING){ //! CADENA!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> STRING
                            var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + value2.valor);
                            this.tipo=Tipo.STRING
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> STRING
                            var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + value2.valor);
                            this.tipo=Tipo.STRING
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.BOOLEAN){//? BOOLEAN -----> STRING
                            if(this.expIzq.valor == true){
                                var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + 'true');
                                this.tipo=Tipo.STRING
                                return temp.valor
                            }else{
                                    var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + 'false');
                                    this.tipo=Tipo.STRING
                                return temp
                            }
                        }
                        else if(this.expIzq.tipo == Tipo.CARACTER){//? CARACTER -----> STRING
                            var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor+value2.valor);
                            this.tipo=Tipo.STRING
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.STRING){//? CADENA -----> CADENA
                            var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + value2.valor);
                            this.tipo=Tipo.STRING
                            return temp.valor
                        }else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede sumar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp.valor
                        }
                    }
                    else{
                        arbolIns.setError(instruccionesAPI.errorSemantico("F No se puede sumar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                        return new val.val(this.fila, this.column, Tipo.ERROR, "F (ERROR SEMANTICO) No se puede sumar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                    }
                }
                //! **********************     SI ES UNA RESTA:  ***********************************
                else if(this.op== 'RESTA'){
                    if(this.expDer.tipo == Tipo.INT){ //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> ENTERO
                            var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor - value2.valor);
                            this.tipo=Tipo.INT
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor - value2.valor);
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.BOOLEAN){//? BOOLEAN -----> ENTERO
                            if(this.expIzq.valor == true){
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor - 1);
                                this.tipo=Tipo.INT
                            return temp.valor
                        }else{
                            var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor);
                            this.tipo=Tipo.INT
                                return temp.valor
                            }
                        }
                        else if(this.expIzq.tipo == Tipo.CARACTER){//? CARACTER -----> ENTERO
                            try {
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor - value2.valor.charCodeAt(0));
                                this.tipo=Tipo.INT
                            return temp.valor
                        } catch (error) {
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor);
                                this.tipo=Tipo.INT
                            return temp.valor
                        }
                        }
                        // else if(value2.tipo == Tipo.STRING){//? CADENA -----> CADENA
                        //     var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + value2.valor);
                        // }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede restar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede restar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    else if(this.expDer.tipo== Tipo.DOUBLE){ //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor - value2.valor);
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor - value2.valor);
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.BOOLEAN){//? BOOLEAN -----> DOUBLE
                            if(this.expIzq.tipo == true){
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor - 1);
                                this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }else{
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor);
                                this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        }
                        else if(this.expIzq.tipo == Tipo.CARACTER){//? CARACTER -----> DOUBLE
                            try {
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor - value2.valor.charCodeAt(0));
                                this.tipo=Tipo.DOUBLE
                            return temp.valor
                        } catch (error) {
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor);
                                this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        }
                        // else if(value2.tipo == Tipo.STRING){//? CADENA -----> CADENA
                        //     var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + value2.valor);
                        // }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede restar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede restar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    else if(this.expDer.tipo== Tipo.BOOLEAN){ //! BOOLEAN!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> ENTERO
                            if(this.expDer.valor == true){
                                var temp= new val.val(this.fila, this.column, Tipo.INT, 1-value2.valor);
                                this.tipo=Tipo.INT
                            return temp.valor
                        }else{
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value2.valor);
                                this.tipo=Tipo.INT
                            return temp
                        }
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            if(this.expDer.valor == true){
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, 1-value2.valor );
                                this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }else{
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, 0-value2.valor);
                            return temp.valor
                        }
                        }
                        
                        // else if(value2.tipo == Tipo.BOOLEAN){//? BOOLEAN -----> ENTERO
                        //     if(value2.valor == true){
                        //         var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor + 1);
                        //     }else{
                        //         var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor);
                        //     }
                        // }
                        // else if(value2.tipo == Tipo.CARACTER){//? CARACTER -----> ENTERO
                        //     try {
                        //         var temp= new val.val(this.fila, this.column, Tipo.INT, value2.charCodeAt(0)+value.valor);
                        //     } catch (error) {
                        //         var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor);
                        //     }
                        // }
                        
                        // else if(value2.tipo == Tipo.STRING){//? CADENA -----> CADENA
                        //     if(value.valor == true){
                        //         var temp= new val.val(this.fila, this.column, Tipo.STRING, 'true'+value2.valor);
                        //     }else{
                        //         var temp= new val.val(this.fila, this.column, Tipo.STRING, 'false'+value2.valor);
                        //     }
                        // }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede restar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede restar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    else if(this.expDer.tipo == Tipo.CARACTER){ //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> ENTERO
                            try {
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor.charCodeAt(0)-value2.valor);
                                this.tipo=Tipo.INT
                            return temp.valor
                        } catch (error) {
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value2.valor);
                                this.tipo=Tipo.INT
                            return temp
                        }
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value2.valor - value.valor.charCodeAt(0));
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        // else if(value2.tipo == Tipo.BOOLEAN){//? BOOLEAN -----> ENTERO
                        //     if(value2.valor == true){
                        //         var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor + 1);
                        //     }else{
                        //         var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor);
                        //     }
                        // }
                        // else if(value2.tipo == Tipo.CARACTER){//? CARACTER -----> CADENA
                        //     try {
                        //         var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor+value2.valor);
                        //     } catch (error) {
                        //         var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor);
                        //     }
                        // }
                        // else if(value2.tipo == Tipo.STRING){//? CADENA -----> CADENA
                        //     var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + value2.valor);
                        // }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede restar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede restar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    // else if(value.tipo == Tipo.STRING){ //! CADENA!!!!!!!!!!!!!!!!!!!!!!!!!
                    //     if(value2.tipo == Tipo.INT){ //? ENTERO -----> STRING
                    //         var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + value2.valor);
                    //     }
                    //     else if(value2.tipo == Tipo.DOUBLE){//? DOUBLE -----> STRING
                    //         var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + value2.valor);
                    //     }
                    //     else if(value2.tipo == Tipo.BOOLEAN){//? BOOLEAN -----> STRING
                    //         if(value2.valor == true){
                    //             var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + 'true');
                    //         }else{
                    //             var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + 'false');
                    //         }
                    //     }
                    //     else if(value2.tipo == Tipo.CARACTER){//? CARACTER -----> STRING
                    //         var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor+value2.valor);
                    //     }
                    //     else if(value2.tipo == Tipo.STRING){//? CADENA -----> CADENA
                    //         var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + value2.valor);
                    //     }else{
                    //         arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                    //         var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede sumar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                    //     }
                    // }
                    else{
                        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede restar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                        return new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede restar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                    }
                }
                //! **********************     SI ES UNA MULTIPLICACION:  ***********************************
                else if(this.op== 'MULTIPLICACION'){
                    if(this.expDer.tipo == Tipo.INT){ //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> ENTERO
                            var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor * value2.valor);
                            this.tipo=Tipo.INT
                            // console.log("valor retornado entero y entero: ")
                            // console.log(temp.valor)
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor * value2.valor);
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.CARACTER){//? CARACTER -----> ENTERO
                            try {
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor * value2.valor.charCodeAt(0));
                                this.tipo=Tipo.INT
                            return temp.valor
                        } catch (error) {
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor);
                            return temp
                        }
                        }
                        // else if(value2.tipo == Tipo.STRING){//? CADENA -----> CADENA
                        //     var temp= new val.val(this.fila, this.column, Tipo.STRING, value.valor + value2.valor);
                        // }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede multiplicar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede multiplicar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    else if(this.expDer.tipo == Tipo.DOUBLE){ //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo== Tipo.INT){ //? ENTERO -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor * value2.valor);
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor * value2.valor);
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.CARACTER){//? CARACTER -----> DOUBLE
                            try {
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor * value2.valor.charCodeAt(0));
                                this.tipo=Tipo.DOUBLE
                            return temp.valor
                        } catch (error) {
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor);
                            return temp
                        }
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede multiplicar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede multiplicar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    else if(this.expDer.tipo == Tipo.CARACTER){ //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> ENTERO
                            try {
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value.valor.charCodeAt(0)*value2.valor);
                                this.tipo=Tipo.INT
                            return temp.valor
                        } catch (error) {
                                var temp= new val.val(this.fila, this.column, Tipo.INT, value2.valor);
                                this.tipo=Tipo.INT
                            return temp
                        }
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value2.valor * value.valor.charCodeAt(0));
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede multiplicar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede multiplicar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    else{
                        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede multiplicar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                        return new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede multiplicar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                    }
                }
                //! **********************     SI ES UNA DIVISION:  ***********************************
                else if(this.op== 'DIVISION'){
                    if(value2.valor==0){
                        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede dividir por 0",this.fila,this.column));
                        arbolIns.console.push("Error Semantico: No se puede dividir por 0");
                        return new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede dividir por 0");
                    }
                    if(this.expDer.tipo == Tipo.INT){ //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> ENTERO
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor / value2.valor);
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor / value2.valor);
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.CARACTER){//? CARACTER -----> ENTERO
                            try {
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor / value2.valor.charCodeAt(0));
                                this.tipo=Tipo.DOUBLE
                            return temp.valor
                        } catch (error) {
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor);
                                this.tipo=Tipo.DOUBLE
                            return temp
                        }
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede dividir los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede dividir los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    else if(this.expDer.tipo == Tipo.DOUBLE){ //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor / value2.valor);
                            this.tipo=Tipo.DOUBLE

                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor / value2.valor);
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.CARACTER){//? CARACTER -----> DOUBLE
                            try {
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor / value2.valor.charCodeAt(0));
                                this.tipo=Tipo.DOUBLE
                            return temp.valor
                        } catch (error) {
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor);
                                this.tipo=Tipo.DOUBLE
                            return temp
                        }
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede dividir los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede dividir los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    else if(this.expDer.tipo == Tipo.CARACTER){ //! CARACTER!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> DOUBLE
                            try {
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor.charCodeAt(0)/value2.valor);
                                this.tipo=Tipo.DOUBLE
                            return temp.valor
                        } catch (error) {
                                var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value2.valor);
                                this.tipo=Tipo.DOUBLE
                            return temp
                        }
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE,value.valor.charCodeAt(0) /value2.valor );
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede dividir los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    else{
                        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede DIVIDIR los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                        return new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede DIVIDIR los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                    }
                }
                //! **********************     SI ES UNA POTENCIA:  ***********************************
                else if(this.op== 'POTENCIA'){
                    if(this.expDer.tipo == Tipo.INT){ //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> ENTERO
                            var temp= new val.val(this.fila, this.column, Tipo.INT, Math.pow(value.valor, value2.valor));
                            this.tipo=Tipo.INT
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE,  Math.pow(value.valor, value2.valor));
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede elevar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede elevar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    else if(this.expDer.tipo == Tipo.DOUBLE){ //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo== Tipo.INT){ //? ENTERO -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE,  Math.pow(value.valor, value2.valor));
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE,  Math.pow(value.valor, value2.valor));
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede elevar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede elevar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    else{
                        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede elevar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                        return new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede sumar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                    }
                }
                //! **********************     SI ES UNA MODULACION...:  ***********************************
                else if(this.op== 'MODULO'){
                    if(this.expDer.tipo == Tipo.INT){ //! ENTERO!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> ENTERO
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor % value2.valor);
                            this.tipo=Tipo.INT
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor % value2.valor);
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sacar el modulo de los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede sacar el modulo de  los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    else if(this.expDer.tipo == Tipo.DOUBLE){ //! DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(this.expIzq.tipo == Tipo.INT){ //? ENTERO -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor % value2.valor);
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else if(this.expIzq.tipo == Tipo.DOUBLE){//? DOUBLE -----> DOUBLE
                            var temp= new val.val(this.fila, this.column, Tipo.DOUBLE, value.valor % value2.valor);
                            this.tipo=Tipo.DOUBLE
                            return temp.valor
                        }
                        else{
                            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sacar el modulo de los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                            var temp= new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede sacar el modulo de los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                            return temp
                        }
                    }
                    else{
                        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede sumar los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo,this.fila,this.column));
                        return new val.val(this.fila, this.column, Tipo.ERROR, "(ERROR SEMANTICO) No se puede sacar el modulo  los tipos "+this.expDer.tipo+" y "+this.expIzq.tipo);
                    }
                } else {
                    arbolIns.setError(
                        instruccionesAPI.errorSemantico(
                        "Operador Invalido, revise que exista o que los tipos coincidan "+this.expDer.tipo+" y "+this.expIzq.tipo,
                        this.fila,
                        this.column
                        )
                    );
                    arbolIns.console.push("Operador Invalido, revise que exista o que los tipos coincidan "+this.expDer.tipo+" y "+this.expIzq.tipo);
                    return new val.val(
                        this.fila,
                        this.column,
                        Tipo.ERROR,
                        "(ERROR SEMANTICO) Operador Invalido, revise que exista o que los tipos coincidan "+this.expDer.tipo+" y "+this.expIzq.tipo
                    );
                    }
            }
        }
    }
}
exports.INSAritmetico = INSAritmetico;


