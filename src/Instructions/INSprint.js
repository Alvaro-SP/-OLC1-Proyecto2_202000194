"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSprint = void 0;

const nodo = require("./ASTGlobal/nodo")
const Tipo = require('./ASTGlobal/tiponodo')
const tipo = require('./ASTGlobal/tiponodo')
const {id} = require('./id');
const val = require("./val")
const instruccionesAPI	= require('../Interpreter/interprete').instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST")

//*************************************************************************** 
//!------------------------------- INSTRUCCION PRINT----------------------------
class INSprint  {
    constructor(data, line, column, isln){
        this.data=data;
        this.line=line;
        this.column=column;
        this.isln = isln;
        if(this.data != null){
        }
        else{
                                //fila, column, tipo, valor
            this.data = new val( line, column, Tipo.VOID,' ')
        }
    }
    ejecutar(arbolIns, table){
        var value
        // console.log(this.data)
        if(this.data instanceof id){
            console.log(arbolIns.symbolTable)
            var valorvariable = table.getSimbol(this.data.id);
            value = valorvariable.data;
        }else{
            let valortemp = this.data.ejecutar(arbolIns, table);
            value = valortemp;
        }
        // Using recursivity i gonna to execute my methods for to show in console
        
        console.log(value)
        if(value != Tipo.ERROR){
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
exports.INSprint = INSprint;