"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const {INSRelacional} = require('../Instructions/INSRelacional');
const {INSBreak} = require('../Instructions/break');
const Tablita = require("./TS/TablaSimbolos");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
//! 5.5 Operadores Aritméticos
// *SUMA RESTA MULTIPLICACION DIVISION POTENCIA MODULO ENTRE OTROS...
class Switch {
    constructor(condicion, cases, def, fila, column) {
        this.condicion = condicion;
        this.cases = cases;
        this.def = def;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns, table) {
        // *corresponde en primer lugar agregar esta instruccion como nueva 
        //*tabla a la tabla de simbolos haciendo referencia a usar cada variable y metodo
        //* que corresponda a esta sentencia switch.
        //*luego se ejecuta la sentencia dentro del switch y se agrega a la tabla de simbolos
    var addtable = new Tablita.TablaSimbolos(table);
    // * se agrega ahora a la nueva tabla para tener en cuenta de que se deben ir manejando
    //* cada uno de las instrucciones dentro del switch e igualmente esto se hara para las demas
    //* estructuras donde no se dependa o no se utilice las variables globalmente ccomo las 
    //* venia manejando con anterioridad.

    //? si hay instrucciones dentro de cases entonces se ejecutan las instrucciones
    if(this.cases!= null){
        
        for(var i = 0; i < this.cases.length; i++){
            var otrocase = this.cases[i].ejecutar(arbolIns, addtable);
                                            // new INSRelacional($1, $3, 'IGUAL',  @1.first_line, @1.first_column);
            var respuestacondi = new INSRelacional.relacional(this.condicion, otrocase.condicion, 'IGUAL', this.line, this.column);
            if (respuestacondi.tipo.tipo == Tipo.tipos.BOOLEANO) {
                //* si al ejecutar la condicion relacional se tiene un true entonces se
                //* debe recorrer cada una de las sentencias dentro de las otras instrucciones del case
                if (respuestacondi.ejecutar(arbolIns, addtable) || !seejecuto) {
                    for (let i = 0; i < otrocase.ins.length; i++) {
                        const respuestacondi2 = otrocase.ins[i].ejecutar(arbolIns, addtable);
                        if(respuestacondi2==null || respuestacondi2.tipo.tipo == Tipo.tipos.BREAK || respuestacondi2 instanceof INSBreak.Break){
                            return null;
                        }
                    }
                }else{
                    //* si no se cumple la condicion entonces se debe ejecutar la sentencia default

                }
            }
        }
    }
    //? si hay instrucciones dentro del default entonces se ejecutan
    if(this.def!= null){
        for(let i = 0; i < this.def.length; i++){
            const respuestacondidef = this.def[i].ejecutar(arbolIns, addtable);
            if(respuestacondidef==null || respuestacondidef.tipo.tipo == Tipo.tipos.BREAK || respuestacondidef instanceof INSBreak.Break){
                return null;
            }
        }
    }
    //si no hay ninguno de los dos por alguna razon entonces se debe retornar null
    return null;
    }
}
exports.Switch = Switch;