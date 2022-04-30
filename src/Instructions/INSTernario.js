"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSTernario = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  5.7 Operador Ternario  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class INSTernario extends nodo.nodo{
    //!<CONDICION> ‘?’ <EXPRESION> ‘:’ <EXPRESION>
    constructor(condicion, secumple, nosecumple, fila, column) {
        //* El operador ternario es un operador que hace uso de 3 operandos para simplificar la
        //*  instrucción ‘if’ por lo que a menudo este operador se le considera como un atajo para
        //*  la instrucción ‘if’.
        super(null)
        this.condicion = condicion;
        this.secumple = secumple;
        this.nosecumple = nosecumple;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns,table){
        // console.log("************** TERNARIO ***************");
        var respuesta = this.condicion.ejecutar(arbolIns,table)
        var value= respuesta;
        var tempresponse= this.secumple.ejecutar(arbolIns,table);
        if(tempresponse==Tipo.ERROR){
            return Tipo.ERROR;
        }
        var tempresponse2 = this.nosecumple.ejecutar(arbolIns, table);
        if (tempresponse2 == Tipo.ERROR) {
            return Tipo.ERROR;
        }
        // console.log(value)
        // console.log(tempresponse)
        // console.log(tempresponse2)
        if(respuesta==null|| value==Tipo.VOID|| value==Tipo.ERROR ){
            return Tipo.ERROR;
        }else{
            if(value){
                this.tipo = this.secumple.tipo;
                // console.log("value ? tempresponse : tempresponse2 == ");
                // console.log(value ? tempresponse : tempresponse2)
                // console.log("************** FIN TERNARIO ***************");
                return value ? tempresponse : tempresponse2;
            }else{
                this.tipo = this.nosecumple.tipo;
                // var tempresponse= this.secumple.ejecutar(arbolIns,table);
                // if(tempresponse==Tipo.ERROR){
                //     return Tipo.ERROR;
                // }
                // var tempresponse2 = this.nosecumple.ejecutar(arbolIns, table);
                // if (tempresponse2 == Tipo.ERROR) {
                //     return Tipo.ERROR;
                // }
                // console.log("value ? tempresponse : tempresponse2 == ");
                // console.log(value ? tempresponse : tempresponse2)
                // console.log("************** FIN TERNARIO ***************");
                return value ? tempresponse : tempresponse2;
            }

        }
    }
}

exports.INSTernario = INSTernario;
