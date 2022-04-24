"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metodos = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const Simbolos = require("./simbolo/Simbolo");
const Tablita = require("./TS/TablaSimbolos");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const INSRelacional = require('../Instructions/INSRelacional');
const INSBreak = require('./Break');
const objMetodo = require('../Instructions/objMetodo');
class metodos{
    constructor(variable,param,tipo,ins, fila, column) {
        this.tipo = tipo;
        this.variable = variable;
        this.param = param;
        this.ins = ins;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns,table) {
        var value;
        value=this.variable.toString()
        if(value==null){
            arbolIns.setError(instruccionesAPI.errorSemantico("No se ha encontrado la variable " + this.variable + " se obtuvo null",this.fila,this.column));
            return new val(this.fila,this.column,Tipo.ERROR,"No se ha encontrado la variable " + this.variable + " se obtuvo null");
        }else{
            value+="_M2412"// mi id que se le asigna a todos los metodos :)
            //* verifico que el metodo no exista en la tabla de simbolos
            var metodo=table.getSimbol(value);
            if(metodo!=null){
                arbolIns.setError(instruccionesAPI.errorSemantico("No se ha encontrado el metodo " + this.variable + " se obtuvo null",this.fila,this.column));
                return new val(this.fila,this.column,Tipo.ERROR,"No se ha encontrado el metodo " + this.variable + " se obtuvo null");
            }else{
                //* ahora que ya se que no existe procedo a crear mi objeto parametro-instrucciones
                var metodo=new objMetodo.objMetodo(this.param,this.ins);
                //* si el tipo del metodo es null no se debe retornar nada
                if(this.tipo == null){
                    //*es unn metodo         (id, data, tipo,  fila, column)
                    //! la agrego como un objeto simbolo
                    var simbolo = new Simbolos.Simbolo(value,metodo,Tipo.METODO,this.fila,this.column);
                    table.insertar(simbolo);
                }else{
                    //! la agrego como un objeto simbolo
                    var simbolo = new Simbolos.Simbolo(value,metodo,Tipo.FUNCION,this.fila,this.column);
                    //*es una funcion
                    table.insertar(value,metodo,Tipo.FUNCION,this.fila,this.column);
                }
            }
        }
    }
}
exports.metodos = metodos;