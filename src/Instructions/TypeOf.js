"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const Tablita = require("./TS/TablaSimbolos");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const INSRelacional = require('./INSRelacional');
const INSBreak = require('./Break');
const INSPrimitivos = require('./INSPrimitivos');
const {id} = require('./id');
class TypeOf extends nodo.nodo {
    constructor(exp, fila, column) {
        super(Tipo.STRING);
        this.exp = exp;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns,table)  {
        try {
            this.exp.ejecutar(arbolIns,table) ;
            try {
                let obtenido;
                if(this.exp instanceof id){
                    obtenido = table.getVariable(this.exp.id);
                    return obtenido.tipo.toString().toLowerCase();
                }else{
                    try {
                        return this.exp.tipo.toString().toLowerCase();
                    } catch (error) {
                        return Tipo.VOID.toString().toLowerCase();
                    }
                }
            }
            catch (err) {
                return this.exp.tipo.toString().toLowerCase();
            }
        }
        catch (err) {
            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede convertir a caracter/texto" ,this.fila,this.column));
            arbolIns.console.push("No se puede convertir a caracter/texto"+" en la fila: "+this.fila+" y la columna: "+this.column);
            return new val.val(this.fila,this.column,Tipo.ERROR,"No se puede convertir a caracter/texto");

        }
    }
}
exports.TypeOf = TypeOf;
