"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tipos;
(function (tipos) {
  //!   -----------------------       PARA TABLA DE SIMBOLOS      ----------------------------
  tipos[(tipos["DECLARACION"] = 0)] = "DECLARACION";
  tipos[(tipos["ASIGNACION"] = 1)] = "ASIGNACION";
  tipos[(tipos["DOUBLE"] = 2)] = "DOUBLE"; //DOUBLE
  tipos[(tipos["CARACTER"] = 3)] = "CARACTER"; //CHAR
  tipos[(tipos["STRING"] = 4)] = "STRING";
  tipos[(tipos["BOOLEAN"] = 5)] = "BOOLEAN";

  tipos[(tipos["VECTOR"] = 6)] = "VECTOR"; //ARRAY
  tipos[(tipos["VOID"] = 7)] = "VOID";
  tipos[(tipos["METODO"] = 8)] = "METODO";
  tipos[(tipos["FUNCION"] = 9)] = "FUNCION";
  tipos[(tipos["VARIABLE"] = 10)] = "VARIABLE";
  tipos[(tipos["EXPRESION"] = 11)] = "EXPRESION";
  //!   -----------------------       ARITMETICA      ----------------------------
  tipos[(tipos["ARITMETICO"] = 12)] = "ARITMETICO";
  tipos[(tipos["SUMA"] = 13)] = "SUMA";
  tipos[(tipos["UNITARIA"] = 14)] = "UNITARIA";
  tipos[(tipos["PRINT"] = 15)] = "PRINT";
  tipos[(tipos["MULTIPLICACION"] = 16)] = "MULTIPLICACION";
  tipos[(tipos["DIVISION"] = 17)] = "DIVISION";
  tipos[(tipos["POTENCIA"] = 18)] = "POTENCIA";
  tipos[(tipos["MODULO"] = 19)] = "MODULO";
  tipos[(tipos["INT"] = 20)] = "INT";
  //!   -----------------------       RELACIONALES      ----------------------------
  tipos[(tipos["RELACIONAL"] = 21)] = "RELACIONAL";
  tipos[(tipos["MAYOR"] = 22)] = "MAYOR";
  tipos[(tipos["MENOR"] = 23)] = "MENOR";
  tipos[(tipos["MAYORIGUAL"] = 24)] = "MAYORIGUAL";
  tipos[(tipos["MENORIGUAL"] = 25)] = "MENORIGUAL";
  tipos[(tipos["IGUAL"] = 26)] = "IGUAL";
  tipos[(tipos["NEGACION"] = 27)] = "NEGACION";
  //!   -----------------------       LOGICA      ----------------------------
  tipos[(tipos["LOGICO"] = 28)] = "LOGICO";
  tipos[(tipos["OR"] = 29)] = "OR";
  tipos[(tipos["AND"] = 30)] = "AND";
  tipos[(tipos["NOT"] = 31)] = "NOT";
  tipos[(tipos["DIFERENTE"] = 32)] = "DIFERENTE";
  //!   -----------------------       TERNARIA      ----------------------------
  tipos[(tipos["TERNARIO"] = 33)] = "TERNARIO";
  //!   -----------------------       INCRE DECRE      ----------------------------
  tipos[(tipos["DECREMENTO"] = 34)] = "DECREMENTO";
  tipos[(tipos["INCREMENTO"] = 35)] = "INCREMENTO";
  //!   -----------------------       LLAMADA A FUNCION      ----------------------------
  tipos[(tipos["LLAMADA"] = 36)] = "LLAMADA";
  //!   -----------------------       SENTENCIAS      ----------------------------
  tipos[(tipos["IF"] = 37)] = "IF";
  tipos[(tipos["SWITCH"] = 38)] = "SWITCH";
  tipos[(tipos["WHILE"] = 39)] = "WHILE";
  tipos[(tipos["DOWHILE"] = 40)] = "DOWHILE";
  tipos[(tipos["FOR"] = 41)] = "FOR";

  tipos[(tipos["CONTINUE"] = 42)] = "CONTINUE";
  tipos[(tipos["RETURN"] = 43)] = "RETURN";
  tipos[(tipos["BREAK"] = 44)] = "BREAK";
  //!   -----------------------       FUNCION      ----------------------------
  tipos[(tipos["LENGTH"] = 45)] = "LENGTH";
  tipos[(tipos["TOSTRING"] = 46)] = "TOSTRING";
  tipos[(tipos["TYPEOF"] = 47)] = "TYPEOF";
  tipos[(tipos["ROUND"] = 48)] = "ROUND";
  tipos[(tipos["TRUNCATE"] = 49)] = "TRUNCATE";
  tipos[(tipos["TOUPPER"] = 50)] = "TOUPPER";
  tipos[(tipos["TOLOWER"] = 51)] = "TOLOWER";
  // SYMBOL:             'SYMBOL',
  tipos[(tipos["BLOQUE"] = 52)] = "BLOQUE";
  tipos[(tipos["PARAMETRO"] = 53)] = "PARAMETRO";
  tipos[(tipos["CONTROL"] = 54)] = "CONTROL";
  tipos[(tipos["ERROR"] = 55)] = "ERROR";
  tipos[(tipos["SEMANTICO"] = 56)] = "SEMANTICO";
  tipos[(tipos["SINTACTICO"] = 57)] = "SINTACTICO";
  tipos[(tipos["LEXICO"] = 58)] = "LEXICO";
  tipos[(tipos["LIST"] = 59)] = "LIST";
  tipos[(tipos["VALOR"] = 60)] = "VALOR";
  tipos[(tipos["CASTEO"] = 61)] = "CASTEO";
  tipos[(tipos["NATIVA"] = 62)] = "NATIVA";
})((tipos = exports.tipos || (exports.tipos = {})));
class Tipo {
    constructor(tipo) {
        this.tipo = tipo;
    }
    toString() {
    if (this.tipo === tipos.DECLARACION) {
      return "declaracion";
    } else if (this.tipo === tipos.ASIGNACION) {
      return "asignacion";
    } else if (this.tipo === tipos.DOUBLE) {
      return "double";
    } else if (this.tipo === tipos.CARACTER) {
      return "caracter";
    } else if (this.tipo === tipos.STRING) {
      return "string";
    } else if (this.tipo === tipos.BOOLEAN) {
      return "boolean";
    } else if (this.tipo === tipos.VECTOR) {
      return "vector";
    } else if (this.tipo === tipos.VOID) {
      return "void";
    } else if (this.tipo === tipos.METODO) {
      return "metodo";
    } else if (this.tipo === tipos.FUNCION) {
      return "funcion";
    } else if (this.tipo === tipos.VARIABLE) {
      return "variable";
    } else if (this.tipo === tipos.EXPRESION) {
      return "expresion";
    } else if (this.tipo === tipos.ARITMETICO) {
      return "aritmetico";
    } else if (this.tipo === tipos.SUMA) {
      return "suma";
    } else if (this.tipo === tipos.UNITARIA) {
      return "unitaria";
    } else if (this.tipo === tipos.PRINT) {
      return "print";
    } else if (this.tipo === tipos.MULTIPLICACION) {
      return "multiplicacion";
    } else if (this.tipo === tipos.DIVISION) {
      return "division";
    } else if (this.tipo === tipos.POTENCIA) {
      return "potencia";
    } else if (this.tipo === tipos.MODULO) {
      return "modulo";
    } else if (this.tipo === tipos.INT) {
      return "int";
    } else if (this.tipo === tipos.RELACIONAL) {
      return "relacional";
    } else if (this.tipo === tipos.MAYOR) {
      return "mayor";
    } else if (this.tipo === tipos.MENOR) {
      return "menor";
    } else if (this.tipo === tipos.MAYORIGUAL) {
      return "mayorigual";
    } else if (this.tipo === tipos.MENORIGUAL) {
      return "menorigual";
    } else if (this.tipo === tipos.IGUAL) {
      return "igual";
    } else if (this.tipo === tipos.NEGACION) {
      return "negacion";
    } else if (this.tipo === tipos.LOGICO) {
      return "logico";
    } else if (this.tipo === tipos.OR) {
      return "or";
    } else if (this.tipo === tipos.AND) {
      return "and";
    } else if (this.tipo === tipos.NOT) {
      return "not";
    } else if (this.tipo === tipos.DIFERENTE) {
      return "diferente";
    } else if (this.tipo === tipos.TERNARIO) {
      return "ternario";
    } else if (this.tipo === tipos.DECREMENTO) {
      return "decremento";
    } else if (this.tipo === tipos.INCREMENTO) {
      return "incremento";
    } else if (this.tipo === tipos.LLAMADA) {
      return "llamada";
    } else if (this.tipo === tipos.IF) {
      return "Variable";
    } else if (this.tipo === tipos.SWITCH) {
      return "switch";
    } else if (this.tipo === tipos.WHILE) {
      return "while";
    } else if (this.tipo === tipos.DOWHILE) {
      return "dowhile";
    } else if (this.tipo === tipos.FOR) {
      return "for";
    } else if (this.tipo === tipos.CONTINUE) {
      return "continue";
    } else if (this.tipo === tipos.RETURN) {
      return "return";
    } else if (this.tipo === tipos.BREAK) {
      return "break";
    } else if (this.tipo === tipos.LENGTH) {
      return "length";
    } else if (this.tipo === tipos.TOSTRING) {
      return "tostring";
    } else if (this.tipo === tipos.TYPEOF) {
      return "typeof";
    } else if (this.tipo === tipos.ROUND) {
      return "round";
    } else if (this.tipo === tipos.TRUNCATE) {
      return "truncate";
    } else if (this.tipo === tipos.TOUPPER) {
      return "toupper";
    } else if (this.tipo === tipos.TOLOWER) {
      return "tolower";
    } else if (this.tipo === tipos.BLOQUE) {
      return "bloque";
    } else if (this.tipo === tipos.PARAMETRO) {
      return "parametro";
    } else if (this.tipo === tipos.CONTROL) {
      return "control";
    } else if (this.tipo === tipos.ERROR) {
      return "error";
    } else if (this.tipo === tipos.SEMANTICO) {
      return "semantico";
    } else if (this.tipo === tipos.SINTACTICO) {
      return "sintactico";
    } else if (this.tipo === tipos.LEXICO) {
      return "lexico";
    } else if (this.tipo === tipos.LIST) {
      return "list";
    } else if (this.tipo === tipos.VALOR) {
      return "valor";
    } else if (this.tipo === tipos.CASTEO) {
      return "casteo";
    } else if (this.tipo === tipos.NATIVA) {
      return "nativa";
    }
  }
}
exports.Tipo = Tipo;
