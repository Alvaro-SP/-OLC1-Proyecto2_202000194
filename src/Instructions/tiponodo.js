"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tipo = exports.isInt = exports.tipos = void 0;
var tipos;
(function (tipos) {
    tipos[tipos["ENTERO"] = 0] = "ENTERO";
    tipos[tipos["DECIMAL"] = 1] = "DECIMAL";
    tipos[tipos["CARACTER"] = 3] = "CARACTER";
    tipos[tipos["STRING"] = 4] = "STRING";
    tipos[tipos["BOOLEANO"] = 5] = "BOOLEANO";
    tipos[tipos["VECTOR"] = 6] = "VECTOR";
    tipos[tipos["VOID"] = 7] = "VOID";
    tipos[tipos["METODO"] = 8] = "METODO";
    tipos[tipos["FUNCION"] = 9] = "FUNCION";
    tipos[tipos["VARIABLE"] = 10] = "VARIABLE";
    tipos[tipos["EXPRESION"] = 11] = "EXPRESION";
    tipos[tipos["LIST"] = 12] = "LIST";
    tipos[tipos["VALOR"] = 10] = "VALOR";
    tipos[tipos["VARIABLE"] = 10] = "VARIABLE";
    tipos[tipos["VARIABLE"] = 10] = "VARIABLE";
})(tipos = exports.tipos || (exports.tipos = {}));
// por si es un entero o un decimal
function isInt(numero) {
    if (numero % 1 == 0) {
        return tipos.ENTERO;
    }
    else {
        return tipos.DECIMAL;
    }
}
exports.isInt = isInt;
var Tipo = /** @class */ (function () {
    function Tipo(tipo) {
        this.tipo = tipo;
    }
    Tipo.prototype.toString = function () {
        if (this.tipo === tipos.BOOLEANO) {
            return 'boolean';
        }
        else if (this.tipo === tipos.ENTERO) {
            return 'entero';
        }
        else if (this.tipo === tipos.DECIMAL) {
            return 'decimal';
        }
        else if (this.tipo === tipos.STRING) {
            return 'string';
        }
        else if (this.tipo === tipos.CARACTER) {
            return 'caracter';
        }
        else if (this.tipo === tipos.VARIABLE) {
            return 'Variable';
        }
        else if (this.tipo === tipos.METODO) {
            return 'Metodo';
        }
        else if (this.tipo === tipos.FUNCION) {
            return 'Funcion';
        }
        else if (this.tipo === tipos.VOID) {
            return 'Void';
        }
        else if (this.tipo === tipos.VECTOR) {
            return 'Vector';
        }
        else if (this.tipo === tipos.LIST) {
            return 'List';
        }
        else if (this.tipo === tipos.VALOR) {
            return 'Valor';
        }
        
    };
    return Tipo;
}());
exports.Tipo = Tipo;
