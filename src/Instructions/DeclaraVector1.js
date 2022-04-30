"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignar = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const Tablita = require("./TS/TablaSimbolos");
const Simbolo = require("./simbolo/Simbolo");
const val = require("./val");
const INSPrimitivos = require("./INSPrimitivos");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.12 Declaración y asignación de variables▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class DeclaraVector1 extends nodo.nodo{
constructor(tipo,id,tipo2,valores,fila, column) {
    super(tipo)
    // this.tipo = tipo;
    this.id = id;
    this.tipo2 = tipo2;
    this.valores = valores;
    this.fila = fila;
    this.column = column;
    // this.ambito = ambito;
}
// La diferencia en esta asignacion es de que necesito agregar el ambito de la variable que voy a agregar
// entonces necesito ese nuevo parametro al ejecutar 
ejecutar(arbolIns, table) {
    // console.log("*********************** INICIO DECLARAR VECTOR 1 ***********************");
    // ? si es un array los valores y no hay tipo2
    if((this.valores instanceof Array) && (this.tipo2==null)){
        // console.log("********************** DECLARACION TIPO 2 ***********************");
        /*Declaración tipo 2: En esta declaración, se indica por medio de una lista
        de valores separados por coma, los valores que tendrá el vector, en este
        caso el tamaño del vector será el de la misma cantidad de valores de la
        lista.
        */
        var contenido = [];
        for (let i = 0; i < this.valores.length; i++) {
            this.valores[i].ejecutar(arbolIns, table);
            if ((this.tipo == Tipo.DOUBLE) && (this.valores[i].tipo == Tipo.INT)) {
                this.valores[i].tipo = Tipo.DOUBLE;
                contenido.push(this.valores[i]);
            }
            else if (this.tipo != this.valores[i].tipo) {
                arbolIns.setError(instruccionesAPI.errorSemantico("No se puede DECLARAR porque no coinciden los tipos" ,this.fila,this.column));
                arbolIns.console.push("No se puede DECLARAR porque no coinciden los tipos"+" en la fila: "+this.fila+" y la columna: "+this.column);
                return new val.val(this.fila,this.column,Tipo.ERROR,"No se puede DECLARAR porque no coinciden los tipos");

            }
            else {
                contenido.push(this.valores[i]);
            }
        }
        
        var simbolo = new Simbolo(this.id,contenido,this.tipo,this.fila,this.column, Tipo.VECTOR);
        // console.log("variable declarada: " + simbolo.id+" con valor "+simbolo.data);
        
        
        var getvar=table.getSimbol(this.id)
        if ( getvar == null) {
            var respuesta = table.insertar(simbolo);
            arbolIns.variables.push(simbolo);
        }
        else {
            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede DECLARAR porque ya esta declarada la variable" ,this.fila,this.column));
            arbolIns.console.push("No se puede DECLARAR porque ya esta declarada la variable"+" en la fila: "+this.fila+" y la columna: "+this.column);
            return new val.val(this.fila,this.column,Tipo.ERROR,"No se puede DECLARAR porque ya esta declarada la variable");

        }
    }else if(!(this.valores instanceof Array)&& this.tipo2){//? si valores no es un array y hay tipo2
        // console.log("********************** DECLARACION TIPO 1 ***********************");
        //Declaración tipo 1: En esta declaración, se indica por medio de una
        // expresión numérica del tamaño que se desea el vector, además toma los
        // valores por default para cada tipo.
        if (this.tipo != this.tipo2) {
            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede DECLARAR porque no coinciden los tipos" ,this.fila,this.column));
            arbolIns.console.push("No se puede DECLARAR porque no coinciden los tipos"+" en la fila: "+this.fila+" y la columna: "+this.column);
            return new val.val(this.fila,this.column,Tipo.ERROR,"No se puede DECLARAR porque no coinciden los tipos");
        }
        else {
            var contenido = [];
            const result = this.valores.ejecutar(arbolIns, table);
            if(result.tipo==Tipo.ERROR){
                return result;
            }else{
                if(result instanceof Array){
                    contenido=result;
                }else{
                    for (let i = 0; i < result; i++) {
                    //! si no hay una expresion ENTONCES se DECLARA una variable
                     //! sin ningun tipo de valor  (VALORES POR DEFECTO).
                    var temp
                    if (this.tipo == Tipo.INT) {
                        temp = new INSPrimitivos.INSPrimitivos(Tipo.INT, 0, this.fila,this.column)
                    } else if (this.tipo == Tipo.DOUBLE) {
                        temp = new INSPrimitivos.INSPrimitivos(Tipo.DOUBLE, 0.00, this.fila,this.column)
                    } else if (this.tipo == Tipo.BOOLEAN) {
                        temp = new INSPrimitivos.INSPrimitivos(Tipo.BOOLEAN, true, this.fila,this.column)
                    } else if (this.tipo == Tipo.CARACTER) {
                        temp = new INSPrimitivos.INSPrimitivos(Tipo.CARACTER, " ", this.fila,this.column)
                    } else if (this.tipo == Tipo.STRING) {
                        temp = new INSPrimitivos.INSPrimitivos(Tipo.STRING, 0, this.fila,this.column)
                    }
                    contenido.push(temp);
                }
                }
                var simbolo = new Simbolo(this.id,contenido,this.tipo,this.fila,this.column, Tipo.VECTOR);
                // console.log("variable declarada: " + simbolo.id+" con valor "+simbolo.data);
                var getvar=table.getSimbol(this.id)
                if (getvar == null) {
                    var respuesta = table.insertar(simbolo);
                    arbolIns.variables.push(simbolo);
                }else {
                    arbolIns.setError(instruccionesAPI.errorSemantico("No se puede DECLARAR porque ya esta declarada la variable" ,this.fila,this.column));
                    arbolIns.console.push("No se puede DECLARAR porque ya esta declarada la variable"+" en la fila: "+this.fila+" y la columna: "+this.column);
                    return new val.val(this.fila,this.column,Tipo.ERROR,"No se puede DECLARAR porque ya esta declarada la variable");
                }
            }
        }
    }else{
        // console.log("*********************** FIN DECLARAR VECTOR 1 ***********************");
        return null;
    }
    
}
}
exports.DeclaraVector1 = DeclaraVector1;
