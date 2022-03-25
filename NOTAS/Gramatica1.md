# SIMBOLOS QUE NECESITARE:

Pasar todo a minusculas ya que es Case Insensitive.
/* Comentarios */
/* El lenguaje
deberá soportar dos tipos de comentarios que son los siguientes:
*/
/* Comentarios de una línea*/
(\/\/.*\r\n)|(\/\/.*\n)|(\/\/.*\r)            {}


/* "<!""!"*([^!>]|[^!]">"|"!"[^>])*"!"*"!>" */
/* Comentarios de multilínea */
(\/\*(\s*|.*?)*\*\/)|(\/\/.*)                 {}

/* Espacios*/
\n                  {}
\s+					{}
[ \t\r\n\f]         {}

/*----------------- LEXICO ----------------------- */
/* 5.3 Tipos de Datos RESERVADAS */
"Int"                return 'ENTERO';
"Double"             return 'DOUBLE';
"Boolean"            return 'BOOLEANO';
"Char"               return 'CARACTER';
"String"             return 'ENTERO';
[0-9]+\b 	            return 'VENTERO';
[0-9]+("."[0-9]+)?\b  	return 'VDECIMAL';
"true"          return 'TRUE'
"false"         return 'FALSE'

/* 5.4 Secuencias de Escape  */
[\"].*[\"]           return 'CADENA';

/* 5.5 Operadores Aritméticos */
"+"             return 'MAS'
"-"             return 'RESTA'
"*"             return 'MULTIPLICACION'
"/"             return 'DIVISION'
"^"             return 'POTENCIA'
"%"             return 'MODULO'

/* 5.6 Operadores Relacionales */
"=="            return 'IGUALA'
"!="            return 'DIFERENTE'
"<="            return 'MENORIGUALQ'
"<"             return 'MENORQUE'
">="            return 'MAYORIGUALQ'
">"             return 'MAYORQUE'

/* 5.7 Operador Ternario */
"?"             return 'INTERROGA'
":"             return 'DOSPUNTOS'

/* 5.8 Operadores Lógicos */
"||"            return 'OR'
"&&"            return 'AND'
"!"             return 'NOT'

/* 5.9 Signos de Agrupación 
Los signos de agrupación serán utilizados para agrupar operaciones aritméticas, lógicas o
relacionales. */
"("             return 'PARIZQ'
")"             return 'PARDER'

/* 5.10 Precedencia de Operaciones */
/* Asociación de operadores y precedencia 
    La precedencia de operadores nos indica la importancia en que una operación debe
    realizarse por encima del resto. A continuación, se define la misma.*/
%left  'OR'
%left  'AND'
%right 'NOT'
%left  'IGUALA' 'DIFERENTE' 'MENORQUE' 'MAYORIGUALQ' 'MAYORQUE' 'MAYORIGUALQ'
%left 'MAS' 'MENOS'
%left 'MULTIPLICACION' 'DIVISION'
%left UMENOS


/* 5.11 Caracteres de finalización y encapsulamiento de sentencias (RESERVADAS)*/
";"             return 'PTOCOMA'
"["             return 'CORIZQ'
"]"             return 'CORDER'

/* 5.12 Declaración y asignación de variables*/
[a-z|A-Z]+[a-z|A-Z|0-9|"_"]+      return 'VARIABLE'
","             return 'COMA'
"="             return 'IGUAL'
/* (\'[^']?\')            	return 'CARACTER'
(\'(([\\][\"]|[\\][\']|[\\][n])|([^\n\'\"]{1}))\')  return 'CARACTER' */
(\'(([\\][\"]|[\\][\']|[\\][n]|[\\][t]|[\\][\\])|([^\n\'\"\\]{1}))\') return 'CARACTER'

/* 5.13 Casteos (RESERVADAS)*/


/* 5.14 Incremento y Decremento (RESERVADAS)*/
"++"            return 'INC'
"--"            return 'DEC'
/* 5.15 Estructuras de Datos */


/* 5.16 Sentencias de control (RESERVADAS)*/
"if"            return 'IF'
"else"          return 'ELSE'

"{"             return 'LLAIZQ'
"}"             return 'LLADER'
"switch"        return 'SWITCH'
"case"        return 'CASE'
"break"        return 'BREAK'
"default"        return 'DEFAULT'


/* 5.17 Sentencias cíclicas (RESERVADAS)*/
"while"         return 'WHILE'
"do"            return 'DO'
"for"           return 'FOR'
"new"           return 'NEW'

/* 5.18 Sentencias de transferencia (RESERVADAS)*/
"continue"      return 'CONTINUE'
"return"        return 'RETURN'

/* 5.19 Funciones (RESERVADAS) */
/* 5.20 Métodos (RESERVADAS) */
"void"          return 'VOID'

/* 5.21 Llamadas (RESERVADAS) */
/* 5.22 Función Print (RESERVADAS) */
"print"         return 'PRINT'

/* 5.23 Función Println (RESERVADAS) */
"println"         return 'PRINTLN'

/* 5.24 Función toLower (RESERVADAS) */
"tolower"         return 'TOLOWER'

/* 5.25 Función toUpper (RESERVADAS) */
"toupper"         return 'TOUPPER'
/* 5.26 Round */
"round"         return 'ROUND'

/* 5.25. Funciones nativas (RESERVADAS) */
"length"         return 'LENGTH'
"typeof"         return 'TYPEOF'
"tostring"         return 'TOSTRING'
"tochararray"         return 'TOCHARARRAY'

/* 5.26. Run (RESERVADAS) */
"run"         return 'RUN'

[0-9]+\b                return 'VENTERO';
[0-9]+("."[0-9]+)?\b    return 'VDOUBLE';


/*---------------------------- GRAMATICA --------------------------- */
/* 5.3 Tipos de Datos RESERVADAS */

/* 5.4 Secuencias de Escape  */

/* 5.5 Operadores Aritméticos */


/* 5.6 Operadores Relacionales */


/* 5.7 Operador Ternario */


/* 5.8 Operadores Lógicos */


/* 5.10 Precedencia de Operaciones */


/* 5.11 Caracteres de finalización y encapsulamiento de sentencias (RESERVADAS)*/


/* 5.12 Declaración y asignación de variables*/

/* 5.13 Casteos (RESERVADAS)*/


/* 5.14 Incremento y Decremento (RESERVADAS)*/
/* 5.15 Estructuras de Datos */


/* 5.16 Sentencias de control (RESERVADAS)*/
/* 5.17 Sentencias cíclicas (RESERVADAS)*/

/* 5.18 Sentencias de transferencia (RESERVADAS)*/

/* 5.19 Funciones (RESERVADAS) */
/* 5.20 Métodos (RESERVADAS) */
/* 5.21 Llamadas (RESERVADAS) */
/* 5.22 Función Print (RESERVADAS) */
/* 5.23 Función Println (RESERVADAS) */
/* 5.24 Función toLower (RESERVADAS) */
/* 5.25 Función toUpper (RESERVADAS) */
/* 5.25. Funciones nativas (RESERVADAS) */
/* 5.26. Run (RESERVADAS) */


## REGLAS
\".*\" RE
"\" Es una cadena \" \n \t ahora esta bien \'\'bye\""

# GRAMATICA A USAR (Paso a paso)

