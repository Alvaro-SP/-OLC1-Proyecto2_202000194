"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignaVector1 = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const Tablita = require("./TS/TablaSimbolos");
const Simbolo = require("./simbolo/Simbolo");
const INSPrimitivos = require("./INSPrimitivos");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.12 Declaración y asignación de variables▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class AsignaVector1 extends nodo.nodo{
constructor(id,position,valor,fila, column) {
    super(null)
    // this.tipo = tipo;
    this.id = id;
    this.position = position;
    this.valor = valor;
    this.fila = fila;
    this.column = column;
    // this.ambito = ambito;
}
// La diferencia en esta asignacion es de que necesito agregar el ambito de la variable que voy a agregar
// entonces necesito ese nuevo parametro al ejecutar 
ejecutar(arbolIns, table) {
    console.log("*********************** INICIO ASIGNAR VECTOR 1 ***********************");
    // ? si es un array los valores y no hay tipo2
    const res=this.valor.ejecutar(arbolIns, table);
    if(res.tipo==Tipo.ERROR){
        return res;
    }else{
        var value = this.valor;
        try {
            var getvar=table.getSimbol(this.valor.id)
            if ( (getvar.t2 == Tipo.VARIABLE) ||(getvar.t2==Tipo.VECTOR)) {
                 value=this.valor.valor
            }
        } catch (error) {
            
        }
        var valorvar = table.getSimbol(this.id)
        if(valorvar==null){
            arbolIns.setError(instruccionesAPI.errorSemantico("No se encontro la variable declarela primero" ,this.fila,this.column));
            arbolIns.console.push("No se  encontro la variable declarela primero "+" en la fila: "+this.fila+" y la columna: "+this.column);
            return new val.val(this.fila,this.column,Tipo.ERROR,"No se encontro la variable declarela primero");

        }
        var arreglo = valorvar.data;
        this.pos = this.position.ejecutar(arbolIns, table);
        if (this.position.tipo == Tipo.INT) {
            if ((this.position.ejecutar(arbolIns, table) >= arreglo.length) || (this.position.ejecutar(arbolIns, table) < 0)) {
                arbolIns.setError(instruccionesAPI.errorSemantico("La posicion del Vector fuera de rango No existe." ,this.fila,this.column));
                arbolIns.console.push("La posicion del Vector fuera de rango No existe. "+" en la fila: "+this.fila+" y la columna: "+this.column);
                return new val.val(this.fila,this.column,Tipo.ERROR,"La posicion del Vector fuera de rango No existe.");

            }
            else {
                if (valorvar.tipo != this.valor.tipo) {
                    this.valor.ejecutar(arbolIns, table);
                    if ((valorvar.tipo == Tipo.DOUBLE) && (this.valor.tipo.tipo == Tipo.INT)) {
                        this.valor.tipo = Tipo.DOUBLE;
                        arreglo[this.position.ejecutar(arbolIns, table)] = value;
                        valorvar.data = arreglo;
                        return null;
                    }
                    else {
                        arbolIns.setError(instruccionesAPI.errorSemantico("La posicion del Vector NO se puede asignar porque los tipos de datos no coinciden." ,this.fila,this.column));
                        arbolIns.console.push("La posicion del Vector NO se puede asignar porque los tipos de datos no coinciden. "+" en la fila: "+this.fila+" y la columna: "+this.column);
                        return new val.val(this.fila,this.column,Tipo.ERROR,"La posicion del Vector NO se puede asignar porque los tipos de datos no coinciden.");
            
                    }
                }
                else {
                    arreglo[this.position.ejecutar(arbolIns, table)] = value;
                    valorvar.data = arreglo;
                    return null;
                }
            }
        }
        else {
            arbolIns.setError(instruccionesAPI.errorSemantico("La posicion del Vector debe ser entera, revisar." ,this.fila,this.column));
            arbolIns.console.push("La posicion del Vector debe ser entera, revisar. "+" en la fila: "+this.fila+" y la columna: "+this.column);
            return new val.val(this.fila,this.column,Tipo.ERROR,"La posicion del Vector debe ser entera, revisar.");

        }

    }
}
}
exports.AsignaVector1 = AsignaVector1;
