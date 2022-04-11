"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = void 0;

const nodo = require("./ASTGlobal/nodo")
const Tipo = require('./ASTGlobal/tiponodo')
const tipo = require('./ASTGlobal/tiponodo')
const val = require("./val")
const instruccionesAPI	= require('../Interpreter/interprete').instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST")

//*************************************************************************** 
//!------------------------------- INSTRUCCION PRINT----------------------------
class print extends nodo.nodo {
    constructor(data, line, column, isln){
        this.data=data;
        this.line=line;
        this.column=column;
        this.isln = isln;
        if(this.data != null){
        }
        else{
            this.data = new val( line, column, Tipo(Tipo.tipos.VOID),' ')
        }
    }
    ejecutar(arbolIns, table){
        // Using recursivity i gonna to execute my methods for to show in console
        let valortemp = this.data.ejecutar(arbolIns, table);
        var value = valortemp;
        if(value != Tipo(tipo.ERROR)){
            if (this.isln) {
                arbolIns.console.push(value+'\n'); // add value to console
            } else {
                arbolIns.console.push(value); // add value to console
            }
        }else{
            arbolIns.setError(instruccionesAPI.errorSemantico("Sin ejecucion, NULO ",this.line,this.column));
            arbolIns.console.push("(ERROR SEMANTICO) NULO  "+this.line+' : '+this.column);
        }
        return null;
    }
}
exports.print = print;