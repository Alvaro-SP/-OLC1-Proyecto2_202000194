"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignar = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const Tablita = require("./TS/TablaSimbolos");
const Simbolo = require("./simbolo/Simbolo");
const INSPrimitivos = require("./INSPrimitivos");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const { VARIABLE } = require("./ASTGlobal/tiponodo");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.12 Declaración y asignación de variables▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class Vector1 extends nodo.nodo{
constructor(id,position,fila, column) {
    super(null)
    // this.tipo = tipo;
    this.id = id;
    this.position = position;
    this.fila = fila;
    this.column = column;
    // this.ambito = ambito;
}
// La diferencia en esta asignacion es de que necesito agregar el ambito de la variable que voy a agregar
// entonces necesito ese nuevo parametro al ejecutar 
ejecutar(arbolIns, table) {
    var value=table.getSimbol(this.id);
    if(value==null){
        arbolIns.setError(instruccionesAPI.errorSemantico("No se encontro en la tabla de simbolos" ,this.fila,this.column));
            arbolIns.console.push("No se encontro en la tabla de simbolos "+" en la fila: "+this.fila+" y la columna: "+this.column);
            return new val.val(this.fila,this.column,Tipo.ERROR,"No se encontro en la tabla de simbolos");

    
    }else{
        if(!value){
            arbolIns.setError(instruccionesAPI.errorSemantico("No se encontro en la tabla de simbolos" ,this.fila,this.column));
            arbolIns.console.push("No se encontro en la tabla de simbolos "+" en la fila: "+this.fila+" y la columna: "+this.column);
            return new val.val(this.fila,this.column,Tipo.ERROR,"No se encontro en la tabla de simbolos");
    
        }else{
            if(value.t2==null){
                arbolIns.setError(instruccionesAPI.errorSemantico("No se encontro en la tabla de simbolos" ,this.fila,this.column));
                arbolIns.console.push("No se encontro en la tabla de simbolos "+" en la fila: "+this.fila+" y la columna: "+this.column);
                return new val.val(this.fila,this.column,Tipo.ERROR,"No se encontro en la tabla de simbolos");
    
            }
            this.tipo=value.tipo;
            var elarray=value.data;
            this.pos= this.position.ejecutar(arbolIns,table)
            if(this.position.tipo!=Tipo.INT){
                arbolIns.setError(instruccionesAPI.errorSemantico("El tipo de expresion en la posicion del Vector debe ser solamente ENTERO." ,this.fila,this.column));
                arbolIns.console.push("El tipo de expresion en la posicion del Vector debe ser solamente ENTERO. "+" en la fila: "+this.fila+" y la columna: "+this.column);
                return new val.val(this.fila,this.column,Tipo.ERROR,"El tipo de expresion en la posicion del Vector debe ser solamente ENTERO.");
    
            }
            if((this.position.ejecutar(arbolIns,table)>=elarray.length) || (this.position.ejecutar(arbolIns,table)<0)){
                arbolIns.setError(instruccionesAPI.errorSemantico("El valor de la posicion debe estar entre 0 y el tamaño del vector" ,this.fila,this.column));
                arbolIns.console.push("El valor de la posicion debe estar entre 0 y el tamaño del vector "+" en la fila: "+this.fila+" y la columna: "+this.column);
                return new val.val(this.fila,this.column,Tipo.ERROR,"El valor de la posicion debe estar entre 0 y el tamaño del vector");
    
            }else{
                try {
                    this.valor=elarray[this.position.ejecutar(arbolIns,table)];
                    var temp=elarray[this.position.ejecutar(arbolIns,table)];
                    var temp2 = temp.ejecutar(arbolIns,table);
                    return temp2
                } catch (error) {
                    arbolIns.setError(instruccionesAPI.errorSemantico("La posicion del Vector fuera de rango No existe." ,this.fila,this.column));
                    arbolIns.console.push("La posicion del Vector fuera de rango No existe. "+" en la fila: "+this.fila+" y la columna: "+this.column);
                    return new val.val(this.fila,this.column,Tipo.ERROR,"La posicion del Vector fuera de rango No existe.");
    
                }
            }
        }
    }
}
}
exports.Vector1 = Vector1;
