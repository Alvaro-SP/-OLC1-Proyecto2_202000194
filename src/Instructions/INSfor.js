"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSfor = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const Tablita = require("./TS/TablaSimbolos");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const {INSBreak} = require('./Break');
const {Asignar} = require('../Instructions/Asignar');
const {Declarar} = require('../Instructions/Declarar');
const {INSContinue} = require('../Instructions/continue');
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.17 Sentencias cíclicas▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// *5.17.2. For
class INSfor extends nodo.nodo {
    constructor(fordeclarar, expre, actua,ins , fila, column) {
        super(null);
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
        console.log("*************INSTRUCCION FOR********************: ")
        console.log(this.fordeclarar)
        console.log(this.expre)
        console.log(this.actua)
        console.log(this.ins)
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
            if(this.fordeclarar instanceof Asignar){
                 iniciofor= this.fordeclarar.valor.valor
            }
            //* si es una declaracion:
            if(this.fordeclarar instanceof Declarar){
                iniciofor= this.fordeclarar.valor.valor
            }
            if(iniciofor != null || iniciofor != undefined || iniciofor != NaN || iniciofor != ""){
                if(this.expre.tipo==Tipo.ERROR){
                    arbolIns.setError(instruccionesAPI.errorSemantico("En la asignacion del for debe existir una expresion ENTERA no de tipo: " +this.expre.tipo ,this.fila,this.column));
                    return new val.val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) En la asignacion del for debe existir una expresion ENTERA no de tipo:  " +this.expre.tipo );
                }else{
                    if(finfor.tipo==Tipo.ERROR){
                        arbolIns.setError(instruccionesAPI.errorSemantico("En la expresion del for debe existir una expresion BOOLEANA no de tipo: " +finfor.tipo.tipo ,this.fila,this.column));
                        return new val.val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) En la expresion del for debe existir una expresion BOOLEANA no de tipo:  " +finfor.tipo.tipo );
                    }else{
                        //si es entera
                        var respuesta
                        var iguana=0;
                        do{
                            console.log('▬☻☻▬▬☻☻▬▬☻☻▬▬☻☻▬▬☻☻▬▬☻☻▬▬☻☻▬inicia DO▬☻☻▬▬☻☻▬▬☻☻▬▬☻☻▬▬☻☻▬▬☻☻▬▬☻☻▬')
                            console.log('this.expre: ')
                            console.log(this.expre)
                            respuesta = this.expre.ejecutar(arbolIns, addtable);
                            console.log('respuesta obtenida')
                            console.log(respuesta)
                            if (this.expre.tipo == Tipo.BOOLEAN) {
                                if(this.ins!=null){
                                    if(respuesta){
                                        for(let i=0;i<this.ins.length;i++){
                                            let respuesta2 = this.ins[i].ejecutar(arbolIns, addtable);
                                            try {
                                                if(this.ins[i].tipo=="BREAK"){
                                                    return;
                                                }
                                                if(this.ins[i].tipo=="RETURN"){
                                                    return;
                                                }
                                                if(this.ins[i].tipo=="CONTINUE"){
                                                    break ;
                                                }
                                            } catch (error) {
                                            }
                                        }
                                    }
                                }
                            }else {
                                arbolIns.setError(instruccionesAPI.errorSemantico("En el for debe existir una condicion BOOLEANA no de tipo: " +respuesta.tipo ,this.fila,this.column));
                                return new val.val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) En el while debe existir una condicion BOOLEANA no de tipo: " +respuesta.tipo );
                            }
                            this.actua.ejecutar(arbolIns, table);
                            iguana++
                        }while(respuesta);
                        return null
                    }
                }
            }else{
                arbolIns.setError(instruccionesAPI.errorSemantico("En la asignacion del for debe existir una expresion ENTERA no de tipo: " +this.expre.tipo ,this.fila,this.column));
                return new val.val(this.fila,this.column,Tipo.ERROR,"(ERROR SEMANTICO) En la asignacion del for debe existir una expresion ENTERA no de tipo:  " +this.expre.tipo );
            }
        }else{
            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede obtener la la declaracion o asignacion del for" ,this.fila,this.column));
            arbolIns.console.push("No se puede obtener la la declaracion o asignacion del for"+" en la fila: "+this.fila+" y la columna: "+this.column);
            return new val.val(this.fila,this.column,Tipo.ERROR,"No se puede obtener la la declaracion o asignacion del for");

        }
    }
}
exports.INSfor = INSfor;
