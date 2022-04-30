"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSwhile = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const Tablita = require("./TS/TablaSimbolos");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const {INSBreak} = require('./Break');
const {INSContinue} = require('../Instructions/continue');
const { INSreturn } = require("./INSreturn");
const { Break } = require("./Break");
const { Continue } = require("./Continue");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.17 Sentencias cíclicas▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// *5.17.1. While
class INSwhile extends nodo.nodo{
  constructor(condicion, dentrowhile, fila, column) {
    super(null);
    this.condicion = condicion;
    this.dentrowhile = dentrowhile;
    this.fila = fila;
    this.column = column;
  }
  ejecutar(arbolIns, table) {
    const addtable = new Tablita.TablaSimbolos(table);
    if(this.condicion!=null){
      let respuesta 
      respuesta = this.condicion.ejecutar(arbolIns, addtable);
      while(respuesta){
        
        if (this.condicion.tipo != Tipo.BOOLEAN) {
          arbolIns.setError(instruccionesAPI.errorSemantico("En el while debe existir una condicion BOOLEANA no de tipo: " +respuesta.tipo ,this.fila,this.column));
          return new val.val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) En el while debe existir una condicion BOOLEANA no de tipo: " +respuesta.tipo );

        }else {
          if(this.dentrowhile!=null){
            if(respuesta){
              for(let i=0;i<this.dentrowhile.length;i++){
                let respuesta2 = this.dentrowhile[i].ejecutar(arbolIns, addtable);
                if (respuesta2 instanceof Continue) {
                  break;
              }
              else if (respuesta2 instanceof Break || respuesta2 instanceof INSreturn) {
                  return;
              }
                try {
                  if(this.dentrowhile[i].tipo=="BREAK"){
                    return;
                  }
                  if(this.dentrowhile[i].tipo=="CONTINUE"){
                    break ;
                  }
                  if(this.dentrowhile[i].tipo=="RETURN"){
                    return ;
                  }
                } catch (error) {
                }
              }
            }
          }
        }
        // respuesta = this.condicion.ejecutar(arbolIns, table);
        respuesta = this.condicion.ejecutar(arbolIns, addtable);
      }
    }else{
      //error
      arbolIns.setError(instruccionesAPI.errorSemantico("la condicion no debe ser null se esperaba BOOLEANO y no " +respuesta.tipo ,this.fila,this.column));
      return new val.val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) la condicion no debe ser null se esperaba BOOLEANO y no " +respuesta.tipo );
    }
    return null;
  }
}
exports.INSwhile = INSwhile;
