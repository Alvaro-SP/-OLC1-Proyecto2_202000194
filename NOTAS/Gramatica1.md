# SIMBOLOS QUE NECESITARE:

Pasar todo a minusculas ya que es Case Insensitive.
/* Comentarios */
/* El lenguaje
deberá soportar dos tipos de comentarios que son los siguientes:
*/
/* Comentarios de una línea*/
"/""/".*            {}

/* Comentarios de multilínea*/
[/][*][^*/]*[*][/]  {}

/* Espacios*/
\n                  {}
\s+					{}
[ \t\r\n\f]         {}

/*----------------- Lexemas ----------------------- */
/* 5.3 Tipos de Datos RESERVADAS */
"Int"                return 'ENTERO';
"Double"             return 'DOUBLE';
"Boolean"            return 'BOOLEANO';
"Char"               return 'CARACTER';
"String"             return 'ENTERO';

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

/* 5.9 Signos de Agrupación */


/* 5.10 Precedencia de Operaciones */


/* 5.11 Caracteres de finalización y encapsulamiento de sentencias (RESERVADAS)*/


/* 5.13 Casteos (RESERVADAS)*/


/* 5.14 Incremento y Decremento (RESERVADAS)*/

/* 5.15 Estructuras de Datos */

        /* Vectores */

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

[0-9]+\b                return 'VENTERO';
[0-9]+("."[0-9]+)?\b    return 'VDOUBLE';



## REGLAS
\".*\" RE
"\" Es una cadena \" \n \t ahora esta bien \'\'bye\""

# GRAMATICA A USAR (Paso a paso)

