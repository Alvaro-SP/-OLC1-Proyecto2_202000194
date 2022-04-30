const Tipo = {
  //!   -----------------------       PARA TABLA DE SIMBOLOS      ----------------------------
  DECLARACION: "DECLARACION",
  ASIGNACION: "ASIGNACION",
  DOUBLE: "DOUBLE", //DOUBLE
  CARACTER: "CARACTER", //CHAR
  STRING: "STRING",
  BOOLEAN: "BOOLEAN",

  VECTOR: "VECTOR", //ARRAY
  VOID: "VOID",
  METODO: "METODO",
  FUNCION: "FUNCION",
  VARIABLE: "VARIABLE",
  EXPRESION: "EXPRESION",
  //!   -----------------------       ARITMETICA      ----------------------------
  ARITMETICO: "ARITMETICO",
  SUMA: "SUMA",
  UNITARIA: "UNITARIA",
  PRINT: "PRINT",
  MULTIPLICACION: "MULTIPLICACION",
  DIVISION: "DIVISION",
  POTENCIA: "POTENCIA",
  MODULO: "MODULO",
  INT: "INT",
  //!   -----------------------       RELACIONALES      ----------------------------
  RELACIONAL: "RELACIONAL",
  MAYOR: "MAYOR",
  MENOR: "MENOR",
  MAYORIGUAL: "MAYORIGUAL",
  MENORIGUAL: "MENORIGUAL",
  IGUAL: "IGUAL",
  NEGACION: "NEGACION",
  //!   -----------------------       LOGICA      ----------------------------
  LOGICO: "LOGICO",
  OR: "OR",
  AND: "AND",
  NOT: "NOT",
  DIFERENTE: "DIFERENTE",
  //!   -----------------------       TERNARIA      ----------------------------
  TERNARIO: "TERNARIO",
  //!   -----------------------       INCRE DECRE      ----------------------------
  DECREMENTO: "DECREMENTO",
  INCREMENTO: "INCREMENTO",
  //!   -----------------------       LLAMADA A FUNCION      ----------------------------
  LLAMADA: "LLAMADA",
  //!   -----------------------       SENTENCIAS      ----------------------------
  IF: "IF",
  SWITCH: "SWITCH",
  WHILE: "WHILE",
  DOWHILE: "DOWHILE",
  FOR: "FOR",

  CONTINUE: "CONTINUE",
  RETURN: "RETURN",
  BREAK: "BREAK",
  //!   -----------------------       FUNCION      ----------------------------
  LENGTH: "LENGTH",
  TOSTRING: "TOSTRING",
  TYPEOF: "TYPEOF",
  ROUND: "ROUND",
  TRUNCATE: "TRUNCATE",
  TOUPPER: "TOUPPER",
  TOLOWER: "TOLOWER",
  // SYMBOL:             'SYMBOL',
  BLOQUE: "BLOQUE",
  PARAMETRO: "PARAMETRO",
  CONTROL: "CONTROL",
  ERROR: "ERROR",
  SEMANTICO: "SEMANTICO",
  SINTACTICO: "SINTACTICO",
  LEXICO: "LEXICO",
  LIST: "LIST",
  VALOR: "VALOR",
  CASTEO: "CASTEO",
  NATIVA: "NATIVA",
};
module.exports = Tipo;
