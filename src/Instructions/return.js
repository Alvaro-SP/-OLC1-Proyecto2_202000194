"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asignar = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const Tablita = require("./TS/TablaSimbolos");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const INSRelacional = require('../Instructions/INSRelacional');
const INSBreak = require('../Instructions/break');
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  5.21 Llamadas  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class asignar {
    constructor(valor,  fila, column) {
        // this.variable = variable;
        this.valor = valor;
        this.fila = fila;
        this.column = column;
        // this.ambito = ambito;
    }
    ejecutar(arbolIns, table) {
        //* si no hay valor a retornar se manda el objeto como tal :v
        if (this.valor == null) {
            return this
        }else{
            //* si hay valor a retornar se manda el valor de la variable
            this.newvalor=this.valor.ejecutar(arbolIns, table);
            return this
        }
    }
}

exports.asignar = asignar;