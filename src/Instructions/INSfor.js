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
const {Asignar} = require('../Instructions/Asignar');
const {Declarar} = require('../Instructions/Declarar');
const {INSContinue} = require('../Instructions/continue');
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.17 Sentencias cíclicas▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// *5.17.2. For
class For {
    constructor(fordeclarar, expre, actua,ins , fila, column) {
        this.fordeclarar = fordeclarar;
        this.expre = expre;
        this.actua = actua;
        this.ins = ins;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns, table) {
        // FOR(int i = 0; i<10,i++){
        // INSTRUCCIONES
        //}
        //* se revusa que no este vacia la declaracion/asignacion
        if(this.fordeclarar!=null){
            //* este valor es la declaracion o asignacion donde se guarda
            let valortemp = this.fordeclarar.ejecutar(arbolIns, table);
            //* creo nueva tabla
            const addtable = new Tablita.TablaSimbolos(table);
            var resultado
            var value = valortemp;
            var iniciofor
            var finfor=this.expre
            //* si es una asignacion:
            if(this.fordeclarar instanceof Asignar.asignar){
                 iniciofor= this.fordeclarar.valor.valor
            }
            //* si es una declaracion:
            if(this.fordeclarar instanceof Declarar.declarar){
                iniciofor= this.fordeclarar.valor.valor
            }
            if(iniciofor != null || iniciofor != undefined || iniciofor != NaN || iniciofor != ""){
                if(this.expre.tipo!=Tipo.tipos.INT){
                    arbolIns.setError(instruccionesAPI.errorSemantico("En la asignacion del for debe existir una expresion ENTERA no de tipo: " +this.expre.tipo ,this.fila,this.column));
                    return new val(this.fila,this.column,Tipo.tipos.ERROR,"(ERROR SEMANTICO) En la asignacion del for debe existir una expresion ENTERA no de tipo:  " +this.expre.tipo );
                }else{
                    if(finfor.tipo.tipo!==Tipo.tipos.BOOLEAN){
                        arbolIns.setError(instruccionesAPI.errorSemantico("En la expresion del for debe existir una expresion BOOLEANA no de tipo: " +finfor.tipo.tipo ,this.fila,this.column));
                        return new val(this.fila,this.column,Tipo.tipos.ERROR,"(ERROR SEMANTICO) En la expresion del for debe existir una expresion BOOLEANA no de tipo:  " +finfor.tipo.tipo );
                    }else{
                        //si es entera
                        do{
                            respuesta = finfor.ejecutar(arbolIns, addtable);
                            if (respuesta.tipo.tipo == Tipo.tipos.BOOLEAN) {
                            if(this.ins!=null){
                                if(respuesta){
                                for(let i=0;i<this.ins.length;i++){
                                    let respuesta2 = this.ins[i].ejecutar(arbolIns, addtable);
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
                            this.actua.ejecutar(arbolIns, table);
                        }while(respuesta);
                    }
                }
            }else{
                arbolIns.setError(instruccionesAPI.errorSemantico("En la asignacion del for debe existir una expresion ENTERA no de tipo: " +this.expre.tipo ,this.fila,this.column));
                return new val(this.fila,this.column,Tipo.tipos.ERROR,"(ERROR SEMANTICO) En la asignacion del for debe existir una expresion ENTERA no de tipo:  " +this.expre.tipo );
            }
        }
    }
}
exports.For = For;
