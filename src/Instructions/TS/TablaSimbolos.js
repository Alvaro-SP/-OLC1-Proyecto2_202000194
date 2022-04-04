const simbolo = require("/Simbolo");
const Tipo = require("../tiponodo");
// ! AMBITOS
//* patrones de diseno
var TablaSimbolos =( function () {
  var instancia;
  class SymbolTable {
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
      return res;
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
  function CrearInstancia() {
    return new SymbolTable();
  }

  return {
    getInstance: function () {
      if (!instancia) {
        instancia = CrearInstancia();
      }
      return instancia;
    }
  }
}());

module.exports = SymbolTable;
