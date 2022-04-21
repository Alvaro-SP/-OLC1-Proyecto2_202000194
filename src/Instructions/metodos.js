"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metodo = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const Tablita = require("./TS/TablaSimbolos");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const INSRelacional = require('../Instructions/INSRelacional');
const INSBreak = require('../Instructions/break');
const objMetodos = require('../Instructions/objMetodo');
class metodo{
    constructor(variable,param,tipo,ins, line, column) {
        this.tipo = tipo;
        this.variable = variable;
        this.param = param;
        this.ins = ins;
        this.line = line;
        this.column = column;
    }
    ejecutar(arbolIns,table) {
        var value;
        value=this.variable.toString()
        if(value==null){
            arbolIns.setError(instruccionesAPI.errorSemantico("No se ha encontrado la variable " + this.variable + " se obtuvo null",this.line,this.column));
            return new val(this.line,this.column,Tipo(tipo.ERROR),"No se ha encontrado la variable " + this.variable + " se obtuvo null");
        }else{
            value+="_M2412"// mi id que se le asigna a todos los metodos :)
            //* verifico que el metodo no exista en la tabla de simbolos
            var metodo=table.getSimbol(value);
            if(metodo!=null){
                arbolIns.setError(instruccionesAPI.errorSemantico("No se ha encontrado el metodo " + this.variable + " se obtuvo null",this.line,this.column));
                return new val(this.line,this.column,Tipo(tipo.ERROR),"No se ha encontrado el metodo " + this.variable + " se obtuvo null");
            }else{
                //* ahora que ya se que no existe procedo a crearlo
                var metodo=new objMetodos.objmetodo(this.param,this.ins);
                //* si el tipo del metodo es null no se debe retornar nada
                if(this.tipo == null){
                    
                }
            }
        }
    }
}
exports.metodo = metodo;