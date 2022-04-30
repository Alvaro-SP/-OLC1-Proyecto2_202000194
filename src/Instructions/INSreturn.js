"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSreturn = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const Tablita = require("./TS/TablaSimbolos");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const INSRelacional = require('./INSRelacional');
const INSBreak = require('./Break');
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  5.21 Llamadas  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class INSreturn extends nodo.nodo{
    constructor(expre,  fila, column) {
        super(null)
        // this.variable = variable;
        this.expre = expre;
        this.fila = fila;
        this.column = column;
        // this.ambito = ambito;
    }
    ejecutar(arbolIns, table) {
        //* si no hay valor a retornar se manda el objeto como tal :v
        if (this.expre != null) {
            //* si hay valor a retornar se manda el valor de la variable
            this.exp=this.expre.ejecutar(arbolIns, table);
        }
        // console.log('SE ESTA RETORNANDO ESTO: ')
        // console.log(this)
        return this
    }
}

exports.INSreturn = INSreturn;