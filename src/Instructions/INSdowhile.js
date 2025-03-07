"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSdowhile = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const Tablita = require("./TS/TablaSimbolos");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const { INSreturn } = require("./INSreturn");
const { Break } = require("./Break");
const { Continue } = require("./Continue");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.17 Sentencias cíclicas▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// *5.17.3. Do-While
class INSdowhile extends nodo.nodo{
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
      var ya=true;
      let respuesta
      do{
        respuesta = this.condicion.ejecutar(arbolIns, addtable);
        if (this.condicion.tipo == Tipo.BOOLEAN) {
          if(this.dentrowhile!=null){
            if(respuesta || ya){
              for(let i=0;i<this.dentrowhile.length;i++){
                let respuesta2 = this.dentrowhile[i].ejecutar(arbolIns, addtable);
                if (res instanceof Continue) {
                    break;
                }
                else if (res instanceof Break || res instanceof INSreturn) {
                    return;
                }
                try {
                  if(this.dentrowhile[i].tipo=="BREAK"){
                    return ;
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
        }else {
          arbolIns.setError(instruccionesAPI.errorSemantico("En el while debe existir una condicion BOOLEANA no de tipo: " +respuesta.tipo ,this.fila,this.column));
          return new val.val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) En el while debe existir una condicion BOOLEANA no de tipo: " +respuesta.tipo );
        }
        ya=false;
      }while(respuesta);
    }else{
      //error
      arbolIns.setError(instruccionesAPI.errorSemantico("la condicion no debe ser null se esperaba BOOLEANO y no " +respuesta.tipo ,this.fila,this.column));
      return new val.val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) la condicion no debe ser null se esperaba BOOLEANO y no " +respuesta.tipo );
    }
    return null;
  }
}
exports.INSdowhile = INSdowhile;
