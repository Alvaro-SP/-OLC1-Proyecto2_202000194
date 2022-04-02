"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tipo = exports.isInt = exports.tipos = void 0;
var tipos;
(function (tipos) {
    //!   -----------------------       PARA TABLA DE SIMBOLOS      ----------------------------
    tipos[tipos["DECLARACION"] = 0] = "DECLARACION";
    tipos[tipos["ASIGNACION"] = 1] = "ASIGNACION";
    tipos[tipos["DECIMAL"] = 2] = "DECIMAL"; //DOUBLE
    tipos[tipos["CARACTER"] = 3] = "CARACTER"; //CHAR
    tipos[tipos["STRING"] = 4] = "STRING";
    tipos[tipos["BOOLEAN"] = 5] = "BOOLEAN";
    
    tipos[tipos["VECTOR"] = 6] = "VECTOR"; //ARRAY
    tipos[tipos["VOID"] = 7] = "VOID";
    tipos[tipos["METODO"] = 8] = "METODO";
    tipos[tipos["FUNCION"] = 9] = "FUNCION";
    tipos[tipos["VARIABLE"] = 10] = "VARIABLE";
    tipos[tipos["EXPRESION"] = 11] = "EXPRESION";
    //!   -----------------------       ARITMETICA      ----------------------------
    tipos[tipos["ARITMETICO"] = 12] = "ARITMETICO";
    tipos[tipos["SUMA"] = 13] = "SUMA";
    tipos[tipos["UNITARIA"] = 14] = "UNITARIA";
    tipos[tipos["PRINT"] = 15] = "PRINT";
    tipos[tipos["MULTIPLICACION"] = 16] = "MULTIPLICACION";
    tipos[tipos["DIVISION"] = 17] = "DIVISION";
    tipos[tipos["POTENCIA"] = 18] = "POTENCIA";
    tipos[tipos["MODULO"] = 19] = "MODULO";
    tipos[tipos["INT"] = 20] = "INT";
    //!   -----------------------       RELACIONALES      ----------------------------
    tipos[tipos["RELACIONAL"] = 21] = "RELACIONAL";
    tipos[tipos["MAYOR"] = 22] = "MAYOR";
    tipos[tipos["MENOR"] = 23] = "MENOR";
    tipos[tipos["MAYORIGUAL"] = 24] = "MAYORIGUAL";
    tipos[tipos["MENORIGUAL"] = 25] = "MENORIGUAL";
    tipos[tipos["IGUAL"] = 26] = "IGUAL";
    tipos[tipos["NEGACION"] = 27] = "NEGACION";
     //!   -----------------------       LOGICA      ----------------------------
     tipos[tipos["LOGICO"] = 28] = "LOGICO";
     tipos[tipos["OR"] = 29] = "OR";
     tipos[tipos["AND"] = 30] = "AND";
     tipos[tipos["NOT"] = 31] = "NOT";
     tipos[tipos["DIFERENTE"] = 32] = "DIFERENTE";
     //!   -----------------------       TERNARIA      ----------------------------
     tipos[tipos["TERNARIO"] = 33] = "TERNARIO";
     //!   -----------------------       INCRE DECRE      ----------------------------
     tipos[tipos["DECREMENTO"] = 34] = "DECREMENTO";
     tipos[tipos["INCREMENTO"] = 35] = "INCREMENTO";
     //!   -----------------------       LLAMADA A FUNCION      ----------------------------
     tipos[tipos["LLAMADA"] = 36] = "LLAMADA";
     //!   -----------------------       SENTENCIAS      ----------------------------
    tipos[tipos["IF"] = 37] = "IF";
    tipos[tipos["SWITCH"] = 38] = "SWITCH";
    tipos[tipos["WHILE"] = 39] = "WHILE";
    tipos[tipos["DOWHILE"] = 40] = "DOWHILE";
    tipos[tipos["FOR"] = 41] = "FOR";

    tipos[tipos["CONTINUE"] = 42] = "CONTINUE";
    tipos[tipos["RETURN"] = 43] = "RETURN";
    tipos[tipos["BREAK"] = 44] = "BREAK";
     //!   -----------------------       FUNCION      ----------------------------
     tipos[tipos["LENGTH"] = 45] = "LENGTH";
     tipos[tipos["TOSTRING"] = 46] = "TOSTRING";
     tipos[tipos["TYPEOF"] = 47] = "TYPEOF";
     tipos[tipos["ROUND"] = 48] = "ROUND";
     tipos[tipos["TRUNCATE"] = 49] = "TRUNCATE";
     tipos[tipos["TOUPPER"] = 50] = "TOUPPER";
     tipos[tipos["TOLOWER"] = 51] = "TOLOWER";
    // SYMBOL:             'SYMBOL',
    tipos[tipos["BLOQUE"] = 52] = "BLOQUE";
    tipos[tipos["PARAMETRO"] = 53] = "PARAMETRO";
    tipos[tipos["CONTROL"] = 54] = "CONTROL";
    tipos[tipos["ERROR"] = 55] = "ERROR";
    tipos[tipos["SEMANTICO"] = 56] = "SEMANTICO";
    tipos[tipos["SINTACTICO"] = 57] = "SINTACTICO";
    tipos[tipos["LEXICO"] = 58] = "LEXICO";
    tipos[tipos["LIST"] = 59] = "LIST";
    tipos[tipos["VALOR"] = 60] = "VALOR";
    tipos[tipos["CASTEO"] = 61] = "CASTEO";
    tipos[tipos["NATIVA"] = 62] = "NATIVA";

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
        if (this.tipo === tipos.STRING) {
            return 'string';
        }
        else if (this.tipo === tipos.ENTERO) {
            return 'entero';
        }
        else if (this.tipo === tipos.DECIMAL) {
            return 'decimal';
        }
        else if (this.tipo === tipos.BOOLEANO) {
            return 'boolean';
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
