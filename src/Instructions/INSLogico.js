"use strict";
Object.defineProperty(exports, "__esModule", { valortemp: true });
exports.INSLogico = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
//! 5.8 Operadores Lógicos
// *Son los símbolos que tienen como finalidad comparar expresiones a nivel 
// *lógico (verdadero o falso). 
class INSLogico {
  constructor(expDer, expIzq, tipo, fila, column) {
    this.expDer = expDer;
    this.expIzq = expIzq;
    this.tipo = tipo;
    this.fila = fila;
    this.column = column;
  }
  ejecutar(arbolIns, table) {

    
    if(this.expDer!==null){
        let valortemp = this.expDer.ejecutar(arbolIns, table);
        let valortemp2 = this.expIzq.ejecutar(arbolIns, table);
        
        console.log("***********************valores a comparar con INSLOGICO: ")
        console.log(this.expDer)
        console.log(valortemp)
        console.log(this.expIzq)
        console.log(valortemp2)
        console.log("*************************fin logico*************************")
        if (this.expIzq.tipo!= Tipo.ERROR && this.expDer.tipo!= Tipo.ERROR) {
          //! **********************     SI ES UN AND:  ***********************************
          if (this.tipo === 'AND') {
            this.tipo= Tipo.BOOLEAN
            if (this.expIzq.tipo=== Tipo.BOOLEAN &&this.expDer.tipo=== Tipo.BOOLEAN) {
              return valortemp && valortemp2;
            } else {
              arbolIns.setError(instruccionesAPI.errorSemantico("&& (AND) No se puede operar los tipos " +                    this.expIzq.tipo+" y " +this.expDer.tipo,this.fila,this.column));
              return new val.val(this.fila,this.column,Tipo.ERROR,"&& (ERROR SEMANTICO) No se puede operar los tipos " +this.expIzq.tipo+" y " +this.expDer.tipo);
            }
          }
          //! **********************     SI ES UN OR:  ***********************************
          else if (this.tipo === 'OR') {
            this.tipo= Tipo.BOOLEAN
            console.log(this.expIzq.tipo+'==='+  Tipo.BOOLEAN +'&&'+ this.expDer.tipo+'==='+ Tipo.BOOLEAN)
            if (this.expIzq.tipo=== Tipo.BOOLEAN &&this.expDer.tipo=== Tipo.BOOLEAN) {
              return valortemp || valortemp2;
            } else {
              arbolIns.setError(instruccionesAPI.errorSemantico(" || (OR) No se puede operar los tipos " +this.expIzq.tipo+" y " +this.expDer.tipo,this.fila,this.column));
              return new val.val(this.fila,
                this.column,Tipo.ERROR," || (ERROR SEMANTICO) No se puede operar los tipos " +this.expIzq.tipo+" y " +this.expDer.tipo);
            }
          } else {
            arbolIns.setError(
              instruccionesAPI.errorSemantico("Operador Invalido, revise que exista o que los tipos coincidan " +this.expIzq.tipo+" y " +this.expDer.tipo,this.fila,this.column));
            return new val.val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) Operador Invalido, revise que exista o que los tipos coincidan " +this.expIzq.tipo+" y " +this.expDer.tipo);
          }
        } else {
          arbolIns.setError(instruccionesAPI.errorSemantico("Ya sea que los tipos de las expresiones sean NULAS " +this.expIzq.tipo+" y " +this.expDer.tipo,this.fila,this.column));
          return new val.val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) Operadores alguna es nula o invalida para operar, verifique eso. " +this.expIzq.tipo+" y " +this.expDer.tipo);
        }
    }else{
      let valortemp = this.expIzq.ejecutar(arbolIns, table)
      if (this.tipo == "NOT") {
        this.tipo= Tipo.BOOLEAN
        // ? si mi operador es de tipo BOOLEANO entonces si podre operar sino error.
        if (this.expIzq.tipo== Tipo.BOOLEAN) {
          return !valortemp
        } else {
            arbolIns.setError(
            instruccionesAPI.errorSemantico("No se puede operar ! el tipo de Operador " + valortemp,this.fila,this.column));
          return new val.val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) No se puede operar ! el tipo de Operador " +this.expIzq.tipo+" y " +this.expDer.tipo);
        }
      } else {
        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede operar ! el tipo de Operador " + valortemp,this.fila,this.column));
        return new val.val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) No se puede operar ! el tipo de Operador " +this.expIzq.tipo+" y " +this.expDer.tipo);
      }
  }
  }
}
exports.INSLogico = INSLogico;
