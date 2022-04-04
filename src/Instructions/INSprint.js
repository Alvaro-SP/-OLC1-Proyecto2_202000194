"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = void 0;

const nodo = require("./nodo")
const Tipo = require('./tiponodo')
const tipo = require('./tiponodo')
const InstructionsAST = require("./val")

//*************************************************************************** 
//!------------------------------- INSTRUCCION PRINT----------------------------
class print {
    constructor(data, line, column){
        this.data=data;
        this.line=line;
        this.column=column;
        if(this.data !=null){}
        else{
            this.data= new val( line, column,Tipo(tipo.VALOR), Tipo(tipo.STRING),' ' )
        }
    }
    ejecutar(){
        InstructionsAST.console.push(this.data);
        return null;
    }
}
exports.print = print;