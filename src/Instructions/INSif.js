"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const Tablita = require("./TS/TablaSimbolos");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.16 Sentencias de control▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// *SENTENCIA IF
class If {
  constructor(condicion, dentroif, dentroelse, fila, column) {
    this.condicion = condicion;
    this.dentroif = dentroif;
    this.dentroelse = dentroelse;
    this.fila = fila;
    this.column = column;
  }
  ejecutar(arbolIns, table) {
      // *corresponde en primer lugar agregar esta instruccion como nueva 
      //*tabla a la tabla de simbolos haciendo referencia a usar cada variable y metodo
      //* que corresponda a esta sentencia if.
        //*luego se ejecuta la sentencia dentro del if y se agrega a la tabla de simbolos
    var addtable = new Tablita.TablaSimbolos(table);
    // * se agrega ahora a la nueva tabla para tener en cuenta de que se deben ir manejando
    //* cada uno de las instrucciones dentro del if e igualmente esto se hara para las demas
    //* estructuras donde no se dependa o no se utilice las variables globalmente ccomo las 
    //* venia manejando con anterioridad.
    var respuesta = this.condicion.ejecutar(arbolIns, addtable);
    if(respuesta==null|| respuesta==Tipo.VOID|| respuesta==Tipo.ERROR){
        return null;
    }
    else{
        if(respuesta){
            if (respuesta.tipo == Tipo.BOOLEANO) {
                if (respuesta.valor) {// si es true:
                    for (let i = 0; i < this.dentroif.length; i++) {
                        //ejecuto cada instruccion dentro del if
                        this.dentroif[i].ejecutar(arbolIns, addtable);
                        //valido si tengo algun parametro que detenga mi sentencia
                        // break, continue, return
                        if (this.dentroif[i].tipo === Tipo.BREAK || this.dentroif[i].tipo ===Tipo.CONTINUE || this.dentroif[i].tipo === Tipo.tipos.RETURN) {
                            return this.dentroif[i]
                        }
                    }
                } else {// si es false: el else:
                    if(this.dentroelse!=null){
                        for (let i = 0; i < this.dentroelse.length; i++) {
                            //ejecuto cada instruccion dentro del else
                            this.dentroelse[i].ejecutar(arbolIns, addtable);
                            //valido si tengo algun parametro que detenga mi sentencia
                            // break, continue, return
                            if (this.dentroelse[i].tipo === Tipo.BREAK || this.dentroelse[i].tipo ===Tipo.CONTINUE || this.dentroelse[i].tipo === Tipo.tipos.RETURN) {
                                return this.dentroelse[i]
                            }
                        }
                    }
                }
                return null;
            }else{
                //error
                arbolIns.setError(instruccionesAPI.errorSemantico("En el if debe existir una condicion BOOLEANA no de tipo: " +respuesta.tipo ,this.fila,this.column));
                return new val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) En el if debe existir una condicion BOOLEANA no de tipo: " +respuesta.tipo );
            }
        }else{
            //error
            arbolIns.setError(instruccionesAPI.errorSemantico("Error al obtener la condicion " +respuesta,this.fila,this.column));
            return new val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) Error al obtener la condicion" +respuesta) ;
        }
    }
  }
}
exports.If = If;
