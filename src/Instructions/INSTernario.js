"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ternario = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  5.7 Operador Ternario  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class ternario {
    //!<CONDICION> ‘?’ <EXPRESION> ‘:’ <EXPRESION>
    constructor(condicion, secumple, nosecumple, line, column) {
        //* El operador ternario es un operador que hace uso de 3 operandos para simplificar la
        //*  instrucción ‘if’ por lo que a menudo este operador se le considera como un atajo para
        //*  la instrucción ‘if’.
        this.condicion = condicion;
        this.secumple = secumple;
        this.nosecumple = nosecumple;
        this.line = line;
        this.column = column;
    }
    ejecutar(arbolIns,table){
        var respuesta = this.condicion.ejecutar(arbolIns,table)
        var value= respuesta;
        if(respuesta==null|| value==Tipo.VOID|| value==Tipo.ERROR || value==Tipo.BOOLEAN){
            return Tipo.ERROR;
        }else{
            if(value.valor){
                var tempresponse= this.secumple.ejecutar(arbolIns,table);
                if(tempresponse==Tipo.ERROR){
                    return Tipo.ERROR;
                }
                return tempresponse;
            }else{
                var tempresponse = this.nosecumple.ejecutar(arbolIns, table);
                if (tempresponse == Tipo.ERROR) {
                    return Tipo.ERROR;
                }
                return tempresponse;
            }

        }
    }
}

exports.ternario = ternario;
