"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = void 0;

const nodo = require("./ASTGlobal/nodo")
const Tipo = require('./ASTGlobal/tiponodo')
const tipo = require('./ASTGlobal/tiponodo')
const val = require("./val")
const nodoAST = require("./ASTGlobal/nodoAST")

//*************************************************************************** 
//!------------------------------- INSTRUCCION PRINT----------------------------
class print extends nodo.nodo {
    constructor(data, line, column){
        this.data=data;
        this.line=line;
        this.column=column;
        if(this.data !=null){

        }
        else{
            this.data= new val( line, column,Tipo(tipo.VOID),' ' )
        }
    }
    ejecutar(InstructionsAST, tabla){
        // Using recursivity i gonna to execute my methods for to show in console
        let valortemp = this.data.ejecutar(InstructionsAST, tabla);
        var value = valortemp;
        InstructionsAST.console.push(value); // add value to console
        return null;
    }
}
exports.print = print;