"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// exports.TablaSimbolos = void 0;
const simbolo = require("../simbolo/Simbolo");
const Tipo = require("../ASTGlobal/tiponodo");
// ! AMBITOS
//* patrones de diseno

class TablaSimbolos {
  constructor(root) {
    this.root = root;
    this.simbolos = [];
  }
  //* sirve para insertar un nuevo simbolo
  insertar(simbolos) {
    this.simbolos.push(simbolos);
  }
  //* por si quiero resetear la tabla
  resetear() {
    this.simbolos = [];
  }
  //* vamos a obtener un simbolo
  getSimbol(id) {
    let res = null;
    this.simbolos.forEach((simbolo) => {
      if (simbolo.id == id) {
        res = simbolo;
      }
    });
    let apart;
    for (apart = this; apart != null; apart = apart.root) {
      // console.log("apart.simbolos de TABLA")
      // console.log(apart.simbolos)
      for (let i = apart.simbolos.length-1; i >=0 ; i--) {
        // console.log(apart.simbolos[i].id.toLowerCase()+" con "+id.toLowerCase());
            if (apart.simbolos[i].id.toLowerCase()==id.toLowerCase()) {
              return apart.simbolos[i];
            }
        }
    }

    return null;
  }
  modificar(simbol) {
    this.simbolos.forEach((simbolo) => {
      if (simbolo.nombre == simbol.nombre) {
        simbolo.data = simbol.data;
        simbolo.tipo = simbol.tipo;
        simbolo.fila = simbol.fila;
        simbolo.column = simbol.column;
      }
    });
  }
  modify(id,datain){
    let res = null;
    this.simbolos.forEach((simbolo) => {
      if (simbolo.id == id) {
        res = simbolo;
      }
    });
    let apart;
    for (apart = this; apart != null; apart = apart.root) {
      // console.log("apart.simbolos de TABLA")
      // console.log(apart.simbolos)
      for (let i = apart.simbolos.length-1; i >=0 ; i--) {
        // console.log(apart.simbolos[i].id.toLowerCase()+" con "+id.toLowerCase());
            if (apart.simbolos[i].id.toLowerCase()==id.toLowerCase()) {
              apart.simbolos[i].data = datain;
              return apart.simbolos[i];
            }
        }
    }

    return null;
  }
  getroot() {
    return this.root;
  }
  setroot(thisroot) {
    this.root = thisroot;
  }
  getSimbolos() {
    return this.simbolos;
  }
  setSimbolos(thisimbol) {
    this.simbolos = thisimbol;
  }
}
exports.TablaSimbolos = TablaSimbolos;