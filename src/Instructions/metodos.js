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
class metodos extends nodo.nodo{
    constructor(variable,param,tipo,ins, fila, column) {
        super(tipo)
        // this.tipo = tipo;
        this.variable = variable;
        // console.log("param         **********************")
        // console.log(param)
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
            return new val.val(this.fila,this.column,Tipo.ERROR,"No se ha encontrado la variable " + this.variable + " se obtuvo null");
        }else{
            if(this.param == null){
                this.param=[]
            }
            var a=0;
            for(var i=0;i<this.param.length;i++){
                a++;
            }
            value=value+a+"_M2412"// mi id que se le asigna a todos los metodos :)
            //* verifico que el metodo no exista en la tabla de simbolos
            var metodo=table.getSimbol(value);
            if(metodo!=null){
                arbolIns.setError(instruccionesAPI.errorSemantico("YA existe un metodo asi: " + this.variable + " se obtuvo null",this.fila,this.column));
                return new val.val(this.fila,this.column,Tipo.ERROR,"YA existe un metodo asi:" + this.variable + " se obtuvo null");
            }else{
                //* ahora que ya se que no existe procedo a crear mi objeto parametro-instrucciones
                var metodo=new objMetodo.objMetodo(this.param,this.ins);
                //* si el tipo del metodo es null no se debe retornar nada
                if(this.tipo == Tipo.VOID){
                    //*es unn metodo         (id, data, tipo,  fila, column)
                    //! la agrego como un objeto simbolo
                    var t2=Tipo.METODO
                    var simbolo = new Simbolos(value,metodo,this.tipo,this.fila,this.column,t2);
                    table.insertar(simbolo);
                    arbolIns.variables.push(simbolo);
                }else{
                    //! la agrego como un objeto simbolo
                    var t2=Tipo.FUNCION
                    var simbolo = new Simbolos(value,metodo,this.tipo,this.fila,this.column,t2);
                    //*es una funcion
                    table.insertar(simbolo);
                    arbolIns.variables.push(simbolo);
                }
            }
        }
    }
}
exports.metodos = metodos;

