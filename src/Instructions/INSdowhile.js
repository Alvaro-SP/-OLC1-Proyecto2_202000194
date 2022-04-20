"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dowhile = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const Tablita = require("./TS/TablaSimbolos");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const {INSBreak} = require('../Instructions/break');
const {INSContinue} = require('../Instructions/continue');
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.17 Sentencias cíclicas▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// *5.17.3. Do-While
class Dowhile {
  constructor(condicion, dentrowhile, fila, column) {
    this.condicion = condicion;
    this.dentrowhile = dentrowhile;
    this.fila = fila;
    this.column = column;
  }
  ejecutar(arbolIns, table) {
    if(this.condicion!=null){
      let respuesta

      
      do{
        respuesta = this.condicion.ejecutar(arbolIns, table);
        if (respuesta.tipo.tipo == Tipo.tipos.BOOLEAN) {
          if(this.dentrowhile!=null){
            if(respuesta){
              for(let i=0;i<this.dentrowhile.length;i++){
                let respuesta2 = this.dentrowhile[i].ejecutar(arbolIns, table);
                try {
                  if(respuesta2.kind=="BREAK"){
                    return respuesta2;
                  }
                  if(respuesta2.kind=="CONTINUE"){
                    break ;
                  }
                } catch (error) {
                  console.log(error);
                }
              }
            }
          }
        }else {
          arbolIns.setError(instruccionesAPI.errorSemantico("En el while debe existir una condicion BOOLEANA no de tipo: " +respuesta.tipo ,this.fila,this.column));
          return new val(this.fila,this.column,Tipo.tipos.ERROR,"(ERROR SEMANTICO) En el while debe existir una condicion BOOLEANA no de tipo: " +respuesta.tipo );
        }
      }


      while(respuesta);
    }else{
      //error
      arbolIns.setError(instruccionesAPI.errorSemantico("la condicion no debe ser null se esperaba BOOLEANO y no " +respuesta.tipo ,this.fila,this.column));
      return new val(this.fila,this.column,Tipo.tipos.ERROR,"(ERROR SEMANTICO) la condicion no debe ser null se esperaba BOOLEANO y no " +respuesta.tipo );
    }
    return null;
  }
}
exports.Dowhile = Dowhile;
